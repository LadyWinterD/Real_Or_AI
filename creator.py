import boto3
import uuid
import json
import time
import re

# =============================
# ⚙️ CONFIGURATION (安全模式)
# =============================
TABLE_NAME = "NovaHackathonPuzzles"
REGION = "us-east-1"

# 🛑 安全规范：不要在这里写 Access Key！
# Boto3 会自动从你的本地 ~/.aws/credentials 或环境变量中读取凭证
db = boto3.resource("dynamodb", region_name=REGION).Table(TABLE_NAME)
bedrock = boto3.client("bedrock-runtime", region_name=REGION)

def extract_json(text):
    text = re.sub(r'[\x00-\x1F\x7F]', '', text) 
    match = re.search(r"\{.*\}", text, re.DOTALL)
    if not match:
        raise ValueError("No JSON found in model output")
    return json.loads(match.group())

def generate_task():
    print("🧠 Creator Agent (Nova Lite): Evolving Multi-Dimensional Attack Logic...")
    
    # 核心决策逻辑：强化非现实抽象与物理破坏
    decision_logic = """
You are an Adversarial Visual Architect. 
Your goal is to design visual puzzles that are EASY for humans (Gestalt psychology) but IMPOSSIBLE for AI.

CRITICAL RULES:
1. Target must be a single, common physical object.
2. Provide an array of 'accepted_answers' (3-5 synonyms or related terms, e.g., if target is 'petal', accept 'flower', 'plant', 'blossom').
3. Create exactly 2 completely different visual prompts for this target based on optical illusions (Material Contradiction or Negative Space).

Return STRICT JSON:
{
 "reasoning":"Brief logic",
 "selected_target":"one_word_target",
 "accepted_answers":["synonym1", "synonym2", "synonym3"],
 "riddle":"short human-readable riddle",
 "vectors":[
    { "style":"Material Contradiction", 
      "prompt":"A surreal, high-quality macro photography of [TARGET]. However, the [TARGET] is made entirely out of transparent running water and splashing liquid. Studio lighting, highly detailed, optical illusion, clear silhouette but contradictory liquid material." },
    { "style":"Negative Space", 
      "prompt":"An intricate landscape made of dry autumn leaves and tree branches. The negative space and arrangement of the leaves forms the exact silhouette of a [TARGET]. Double exposure style, hidden object illusion, Gestalt psychology art." }
 ]
}
"""
    try:
        res = bedrock.invoke_model(
            modelId="amazon.nova-lite-v1:0", 
            body=json.dumps({
                "inferenceConfig": {"temperature": 0.85, "max_new_tokens": 1000},
                "messages": [{"role": "user", "content": [{"text": decision_logic}]}]
            })
        )

        raw_text = json.loads(res.get("body").read())["output"]["message"]["content"][0]["text"]
        logic = extract_json(raw_text)

        target_obj = str(logic["selected_target"])
        accepted_answers = logic.get("accepted_answers", [target_obj])
        current_gen = int(time.time())

        print(f"🎯 Target: {target_obj} | 📖 Accepted: {accepted_answers}")

        with db.batch_writer() as batch:
            for v in logic["vectors"][:2]: 
                final_prompt = v["prompt"].replace("[TARGET]", target_obj)
                
                batch.put_item(Item={
                    "PuzzleID": str(uuid.uuid4()),
                    "Generation": current_gen,
                    "Type": v["style"],
                    "Instruction": logic["riddle"],
                    "ImagePrompt": final_prompt,
                    "CorrectAnswer": target_obj,
                    "AcceptedAnswers": accepted_answers,
                    "Status": "PENDING", # 标记为 PENDING，等待 Painter 处理
                    "CreatedAt": current_gen
                })

        print(f"🔥 Success! 2 attack vectors created for {target_obj} and saved to DynamoDB.")

    except Exception as e:
        print("❌ Creator failed:", e)

if __name__ == "__main__":
    generate_task()