from core.config import GEMINI_API_KEY


def check_llm_status():
    if GEMINI_API_KEY:
        return "Gemini API Key Loaded Successfully"
    return "Gemini API Key Not Found"