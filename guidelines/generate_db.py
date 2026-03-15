import os
import json
import base64
import boto3

# ==========================================
# 极速打法配置
# ==========================================
IMAGE_FOLDER = "./images"  # 你的图片所在的文件夹路径
OUTPUT_JSON = "./database.json" # 输出给前端用的 JSON 数据库
REGION = "us-east-1"       # AWS 区域

bedrock = boto3.client(
    "bedrock-runtime", 
    region_name=REGION,
    aws_access_key_id="your key",
    aws_secret_access_key="your keey"
)

def encode_image_to_base64(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

# 注意这里增加了一个 img_format 参数，用来动态适配 png 和 jpg
def get_nova_forensic_report(image_b64, is_ai, filename, img_format):
    # 动态构建 Prompt：告诉 Nova 答案，让它以法医的口吻解释原因
    if is_ai:
        prompt = "You are a Digital Forensic Expert. I am telling you this image is AI-GENERATED. In 2-3 short, punchy sentences, point out the visual clues (like weird lighting, distorted text, merging textures, or physical impossibilities) that prove it is a deepfake. Keep it engaging for a game."
    else:
        prompt = "You are a Digital Forensic Expert. I am telling you this image is a REAL PHOTOGRAPH. In 2-3 short, punchy sentences, point out the natural details (like correct physical reflections, authentic random textures, or logical spatial depth) that prove it is real. Keep it engaging for a game."

    body = json.dumps({
        "inferenceConfig": {"max_new_tokens": 150, "temperature": 0.3},
        "messages": [
            {
                "role": "user",
                "content": [
                    # 动态传入图片格式 (png 或 jpeg)
                    {"image": {"format": img_format, "source": {"bytes": image_b64}}},
                    {"text": prompt}
                ]
            }
        ]
    })

    try:
        response = bedrock.invoke_model(modelId="amazon.nova-pro-v1:0", body=body)
        res_body = json.loads(response.get('body').read())
        return res_body['output']['message']['content'][0]['text']
    except Exception as e:
        print(f"❌ Nova API 失败 ({filename}): {e}")
        return "Forensic analysis unavailable for this image due to a scanning error."

def main():
    print("🕵️ 启动 Nova 法医鉴定扫描器...")
    database = []
    
    # 获取所有图片并排序，方便查看
    files = [f for f in os.listdir(IMAGE_FOLDER) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
    
    for idx, filename in enumerate(files):
        filepath = os.path.join(IMAGE_FOLDER, filename)
        
        # ==========================================
        # 核心修改点 1：通过文件名开头是否包含 "ai" 来判断
        # ==========================================
        is_ai = filename.lower().startswith('ai')
        label_text = "🤖 AI Generated" if is_ai else "📸 Real Photograph"
        
        # ==========================================
        # 核心修改点 2：提取文件后缀，动态判断是 png 还是 jpeg
        # ==========================================
        ext = filename.lower().split('.')[-1]
        img_format = "jpeg" if ext in ['jpg', 'jpeg'] else "png"
        
        print(f"[{idx+1}/{len(files)}] 分析中: {filename[:30]}... -> 判定为: {label_text} (格式: {img_format})")
        
        # 图片转 Base64 并调用 Nova Pro (传入格式)
        img_b64 = encode_image_to_base64(filepath)
        report = get_nova_forensic_report(img_b64, is_ai, filename, img_format)
        
        # 组装单条数据
        item = {
            "id": f"img_{idx+1}",
            "filename": filename,
            "url": f"/images/{filename}", # 前端调用的路径
            "is_ai": is_ai,
            "forensic_report": report
        }
        database.append(item)
        
    # 保存为 JSON
    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(database, f, indent=4, ensure_ascii=False)
        
    print(f"\n✅ 大功告成！成功生成 database.json，共包含 {len(database)} 条数据。")
    print("快去检查一下 database.json 看看 Nova Pro 写的法医报告有多毒舌吧！")

if __name__ == "__main__":
    main()