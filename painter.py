import boto3
import json
import base64
import random
from boto3.dynamodb.conditions import Attr

# =============================
# ⚙️ CONFIGURATION (安全模式)
# =============================
# ⚠️ 注意：请确保这是你真实的 S3 Bucket 名字
S3_BUCKET = "nova-shield-assets-1772353503-my-nova-hack-2026"
TABLE_NAME = "NovaHackathonPuzzles"
REGION = "us-east-1"

# Boto3 会自动读取环境变量，绝对安全
db = boto3.resource("dynamodb", region_name=REGION).Table(TABLE_NAME)
bedrock = boto3.client("bedrock-runtime", region_name=REGION)
s3 = boto3.client("s3", region_name=REGION)

# =============================
# 🌪️ CHAOS PROMPT LIBRARY
# =============================
CHAOS_TEMPLATES = [
"""Adversarial CAPTCHA sketch. White background filled with chaotic black ink scribbles. Noise elements: random strokes, overlapping curves, broken geometric fragments. Inside this chaos hide the distinctive features of {object}. Do NOT draw the full object. Only draw recognizable features. Rules: black thin lines only, no color, no shading.""",
"""Cubist adversarial puzzle. Chaotic abstract background made of fragmented lines. The image should contain misleading geometric shapes that resemble multiple objects. Hidden inside the fragments are partial features of {object}. Techniques: broken outlines, overlapping shapes. Humans should infer the object instantly, but AI vision models should struggle.""",
"""Negative space adversarial puzzle. Create heavy black scribbles and abstract shapes. Between these shapes, the empty space should hint at {object}. Add many fake edges and misleading lines around the real silhouette. The object must not be fully visible."""
]

def paint_pending_tasks():
    # 查找所有等待生成的任务
    response = db.scan(FilterExpression=Attr("Status").eq("PENDING"))
    items = response.get("Items", [])

    if not items:
        print("☕ No pending puzzles in DynamoDB. Creator agent needs to run first.")
        return

    print(f"🖌️ Painter Agent (Nova Canvas): Found {len(items)} puzzles to paint...")

    for item in items:
        pid = item["PuzzleID"]
        base_prompt = item["ImagePrompt"]

        # 动态生成混沌参数，提升游戏难度
        noise_level = random.randint(40, 80)
        occlusion_level = random.randint(30, 60)
        template = random.choice(CHAOS_TEMPLATES)

        final_prompt = template.format(object=base_prompt)
        final_prompt += f"\nNoise level: {noise_level} percent. Occlusion level: {occlusion_level} percent. Add many chaotic scribbles and misleading shapes. The background noise must dominate the image."

        print(f"🎨 Generating {pid} | Noise: {noise_level}% | Occlusion: {occlusion_level}%")

        body = json.dumps({
            "taskType": "TEXT_IMAGE",
            "textToImageParams": {"text": final_prompt},
            "imageGenerationConfig": {
                "numberOfImages": 1,
                "height": 512, # 稍微调高了分辨率，让网页端展示更清晰
                "width": 512,
                "cfgScale": 7.5
            }
        })

        try:
            # 调用 Nova Canvas 生成图片
            res = bedrock.invoke_model(modelId="amazon.nova-canvas-v1:0", body=body)
            img_b64 = json.loads(res["body"].read())["images"][0]

            # 存储到 S3
            file_key = f"puzzles/{pid}.png"
            s3.put_object(
                Bucket=S3_BUCKET,
                Key=file_key,
                Body=base64.b64decode(img_b64),
                ContentType="image/png"
            )

            s3_url = f"https://{S3_BUCKET}.s3.amazonaws.com/{file_key}"

            # 更新 DynamoDB 状态
            db.update_item(
                Key={"PuzzleID": pid},
                UpdateExpression="SET #s = :s, ImageURL = :u",
                ExpressionAttributeNames={"#s": "Status"},
                ExpressionAttributeValues={
                    ":s": "READY",
                    ":u": s3_url
                }
            )

            print(f"✅ Success! Image uploaded: {s3_url}")

        except Exception as e:
            print(f"❌ Failed to paint {pid}: {e}")

if __name__ == "__main__":
    paint_pending_tasks()