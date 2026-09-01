# 🚀 SankhyaDaksh

**SankhyaDaksh** is a state-of-the-art, AI-powered learning management and assessment platform built for the modern era. Designed with a stunning premium UI and backed by a powerful LLM-driven intelligence engine, SankhyaDaksh transforms how users interact with educational materials.

![SankhyaDaksh](https://via.placeholder.com/1200x600.png?text=SankhyaDaksh+Platform)

## ✨ Key Features

- **🎨 Premium UI/UX:** Built with React, featuring a glassmorphism design system, smooth cubic-bezier micro-animations, and vibrant, harmonious gradients.
- **🧠 Live AI Assistant:** A real-time AI copilot integrated directly into the platform, capable of semantic context-awareness and dynamic study generation.
- **🤖 Powered by LLMs:** The backend utilizes the `Groq` and `Gemini` models to provide instantaneous, intelligent responses and dynamic quiz generation.
- **💼 Role-Based Experiences:** Dedicated flows for Officers, Trainers, and Admins to ensure a tailored journey for every user persona.
- **📦 Monorepo Architecture:** Clean, modular, and easy-to-maintain codebase containing both the React frontend and Python FastAPI backend.

## 📁 Repository Structure

```text
SankhyaDaksh/
├── client/      # React Frontend (Vite, Tailwind, Context API)
├── server/      # Node.js Backend (Express, MongoDB)
└── AIML/        # Python AI Service (FastAPI, Groq/Gemini, LangChain)
```

## 🚀 Getting Started

### 1. Start the AI Backend (Python)
The intelligence of the platform runs on a blazing fast Python FastAPI server.

```bash
cd AIML
# Create and activate a virtual environment (optional but recommended)
pip install -r requirements.txt
# Create a .env file and add your API Keys (GROQ_API_KEY, GEMINI_API_KEY)
uvicorn app:app --port 8000
```
*The AI server will run at `http://localhost:8000`*

### 2. Start the Frontend (React / Vite)
The premium user interface is built with React and Vite.

```bash
cd client
npm install
npm run dev
```
*The web app will run at `http://localhost:5173`*

## 🛠️ Technology Stack
* **Frontend:** React, Vite, Lucide Icons, Modern CSS Variables
* **AI Backend:** Python, FastAPI, Groq, Google Gemini
* **Data Layer:** Node.js, Express, MongoDB (Ready for scaling)

## 🏆 Hackathon Ready
This project was meticulously structured and designed for high-impact demonstrations. With seamless LLM integrations and a jaw-dropping UI, SankhyaDaksh is ready to impress.

---
*Built with ❤️ for the future of learning.*
