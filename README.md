# SankhyaDaksh

**SankhyaDaksh** is an advanced, AI-powered competency management and assessment platform designed to bridge the gap between continuous learning and objective evaluation. Built with a modern microservices architecture, SankhyaDaksh provides robust tools for capacity building, real-time analytics, and AI-driven content generation tailored for administrators and learners alike.

## Key Capabilities

- **AI-Driven Assessment Generation:** Automatically generate contextual Multiple Choice Questions (MCQs), flashcards, and study planners directly from uploaded PDF learning materials using Retrieval-Augmented Generation (RAG).
- **Competency Intelligence:** Real-time capability mapping against organizational roles, highlighting critical knowledge gaps and recommending targeted learning interventions.
- **Dynamic Copilot Integration:** A context-aware AI assistant capable of semantic search, document summarization, and query resolution, providing instantaneous support to users.
- **Role-Based Architecture:** Secure, distinct workflows tailored for Administrators, Officers, and Content Trainers.
- **Premium User Experience:** Built on a responsive, high-performance React frontend utilizing modern design principles (glassmorphism, micro-interactions, and curated data visualizations).

## System Architecture

SankhyaDaksh is developed as a modular monorepo, decoupling the user interface, business logic, and artificial intelligence pipelines to ensure scalability and maintainability.

```text
SankhyaDaksh/
├── client/      # Frontend Application (React, Vite, Chart.js)
├── server/      # Core Backend API (Node.js, Express, MongoDB)
└── AIML/        # AI & Data Pipeline (Python, FastAPI, Groq/Gemini, PyPDF2)
```

## Quick Start Guide

To run SankhyaDaksh locally, you will need to initialize the three core services.

### 1. Configure the Environment
Ensure you have the following API keys and URIs provisioned:
- MongoDB URI
- Groq / Gemini API Keys

Create a `.env` file in both the `server/` and `AIML/` directories based on the provided configuration structures.

### 2. Initialize the AI/ML Engine
The intelligence layer operates on a Python-based FastAPI server.

```bash
cd AIML
python -m venv venv
source venv/bin/activate  # Or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
uvicorn app:app --port 8000
```
*The AI microservice will be available at `http://localhost:8000`.*

### 3. Initialize the Core API Server
The Node.js backend handles authentication, data persistence, and acts as an API gateway to the AI engine.

```bash
cd server
npm install
npm run dev
```
*The API server will run at `http://localhost:5000`.*

### 4. Initialize the Frontend Client
The web application is built with React and Vite.

```bash
cd client
npm install
npm run dev
```
*The application will be accessible at `http://localhost:5173`.*

## Technology Stack

- **Frontend:** React, Vite, Chart.js, Lucide Icons, Context API
- **Core Backend:** Node.js, Express.js, MongoDB, Mongoose
- **AI/ML Service:** Python, FastAPI, Groq LLM, LangChain, PyPDF2
- **Infrastructure:** RESTful APIs, Axios, Multer (File Handling)

## License
Confidential and Proprietary. All rights reserved.
