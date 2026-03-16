
# 👁️ REAL OR AI: The Digital Forensics Challenge

> **Submission for the Amazon Nova AI Hackathon** > **Track:** Multimodal Understanding | **Category:** Tech Education & Digital Literacy

---

### 🕵️‍♂️ Inspiration

We are living in an era where the line between reality and synthetic generation has completely blurred. With the rapid evolution of generative AI, deepfakes and AI-generated hallucinations are flooding social media, news outlets, and our daily feeds.

We realized that human visual cognition is fundamentally lagging behind algorithmic rendering capabilities. If we define the probability of human deception as a function of AI realism and human awareness, it might look something like this:

$$P(\text{Deception}) = \lim_{\text{Realism} \to \infty} \left( 1 - e^{-k \cdot \text{Realism}} \right) \times \frac{1}{\text{Awareness}}$$

To combat this, we asked ourselves: **How can we train the human eye to spot digital anomalies? And more importantly, can we use AI to catch AI?** That is how **REAL OR AI** was born.

### 🎮 What it does

**REAL OR AI** is a gamified, interactive visual Turing test.

Players are presented with a series of highly realistic images and must trust their intuition to decide: **Is this a 📸 Real Photograph or 🤖 AI Generated?** Once the user makes a guess, the real magic happens. Regardless of whether they are right or wrong, the app reveals an **Amazon Nova Pro Forensic Report**. We use Amazon Nova Pro as an automated digital forensics expert to point out the exact visual clues—such as physically impossible lighting, merging textures, or authentic random noise—that prove the image's origin. It’s an educational tool disguised as a highly addictive game.

### ⚙️ How we built it

We architected this project focusing on a seamless user experience and powerful backend multimodal capabilities, driven entirely by a triad of Amazon Nova models:

* **The Dataset & Ground Truth:** We curated a high-quality database of challenging images. The "Real" photographs were sourced from Unsplash, featuring natural lighting and complex depth.
* **The "Fake" Arsenal (Nova Lite & Canvas):** We deployed an Adversarial Visual Architect agent using **Nova Lite** to generate mind-bending prompts using Gestalt psychology. A background worker then invoked **Nova Canvas** to inject controlled chaos (noise, occlusion) into these prompts, rendering highly deceptive AI images stored in Amazon S3.
* **The Brain (Nova Pro):** Before the game begins, we run our dataset through **Amazon Nova Pro** via Python and `boto3`. We engineered a specific prompt to roleplay as a "Digital Forensic Expert," feeding the model the images and having it generate punchy, 2-3 sentence visual analysis reports for each specific case.
* **UI/UX Design:** The entire cyber-detective, glassmorphism UI was meticulously designed in Figma to ensure a premium, SaaS-level look and feel.
* **Frontend & Hosting:** We translated the designs into a fully responsive React web app using Vite and Tailwind CSS. The frontend dynamically loads the randomized JSON database to ensure no two games are exactly alike. The entire application is deployed globally via **AWS Amplify**.

### 🧗 Challenges we ran into

1. **Sourcing the Right Difficulty:** Initially, our AI images were too obviously fake (like cats with six legs). We had to dive deep into prompt engineering with Nova Canvas to create images that were nearly perfect, hiding the "tells" in microscopic details like background text or reflection physics.
2. **Prompting for Brevity:** LLMs love to write long essays. Tuning Amazon Nova Pro to act like a snappy, punchy game character rather than a textbook required iterative prompt engineering and adjusting the `temperature` and `max_new_tokens` configurations via the Bedrock API.

### 🏆 Accomplishments that we're proud of

We are incredibly proud of the **"Aha!" moment** this app generates. When a user is 100% convinced an image is real, only for the Nova Pro Forensic Report to point out that the reflections on a coffee cup violate the laws of physics—that is a magical, educational interaction. We successfully turned a complex multimodal AI feature into an accessible, viral-ready consumer experience.

### 🧠 What we learned

**AI is getting terrifyingly realistic, and human intuition is no longer enough.** Through building this dataset and testing it ourselves, we learned that our brains naturally "fill in the blanks" (Gestalt psychology), causing us to overlook AI hallucinations. We also learned that **Amazon Nova Pro has an extraordinary eye for spatial logic and physical inconsistencies** that humans completely miss. The ultimate takeaway? The only reliable defense against malicious AI is *better, more analytical AI*.

### 🚀 What's next for REAL OR AI

* **Browser Extension:** A Chrome plugin that automatically runs the Nova Pro forensic check on images in your X (Twitter) or Facebook feed in real-time.
* **User Uploads:** Allowing players to upload suspicious images they find online and letting Nova Pro instantly verify them.

---

## 👩‍💻 The Investigation Team (Red & Blue)

We are a duo driven by a shared passion for AI, data, and digital security.

* **LadyWinterD (Data & AI Specialist):** Architecting the data pipelines, Nova API integrations, and full-stack frontend experience. Bridging the gap between raw data and intelligent solutions.
* **FOX (Network & Security Architect):** Hardcore infrastructure specialist securing the digital perimeter. Ensuring our architecture follows zero-trust principles and threat-hunting methodologies.

---

*Built with ❤️ and ☕ for the Amazon Nova AI Hackathon 2026.*

