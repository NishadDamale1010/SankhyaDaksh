import os
import requests
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

def get_groq_client():
    key = os.getenv("GROQ_API_KEY")
    if key:
        # 10s timeout so we fail fast and try the next provider
        return Groq(api_key=key, timeout=10.0)
    return None

def ask_openrouter(prompt):
    key = os.getenv("OPENROUTER_API_KEY")
    if not key:
        raise ValueError("OPENROUTER_API_KEY not set")
    url = "https://openrouter.ai/api/v1/chat/completions"
    headers = {"Authorization": f"Bearer {key}"}
    models_to_try = [
        "google/gemma-2-9b-it:free",
        "meta-llama/llama-3.1-8b-instruct:free",
        "qwen/qwen-2.5-72b-instruct:free",
        "meta-llama/llama-3-8b-instruct:free"
    ]
    last_err = None
    for model in models_to_try:
        try:
            data = {
                "model": model,
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 0.3
            }
            response = requests.post(url, headers=headers, json=data, timeout=10)
            response.raise_for_status()
            return response.json()["choices"][0]["message"]["content"]
        except Exception as e:
            last_err = e
            continue
    raise last_err or RuntimeError("All OpenRouter models failed")

def ask_gemini(prompt):
    key = os.getenv("GEMINI_API_KEY")
    if not key:
        raise ValueError("GEMINI_API_KEY not set")
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={key}"
    data = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"temperature": 0.3}
    }
    response = requests.post(url, json=data, timeout=10)
    response.raise_for_status()
    return response.json()["candidates"][0]["content"]["parts"][0]["text"]

import time

def retry_with_backoff(func, max_retries=3, initial_delay=1):
    def wrapper(*args, **kwargs):
        delay = initial_delay
        last_exception = None
        for i in range(max_retries):
            try:
                return func(*args, **kwargs)
            except Exception as e:
                # If it's an auth error, don't retry, fail immediately
                if hasattr(e, 'response') and e.response is not None:
                    if e.response.status_code in (401, 403):
                        raise e
                last_exception = e
                print(f"Call failed ({e}). Retrying in {delay} seconds...")
                time.sleep(delay)
                delay *= 2
        raise last_exception
    return wrapper

@retry_with_backoff
def ask_groq_direct(prompt):
    client = get_groq_client()
    if not client:
        raise ValueError("GROQ_API_KEY not set")
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3
    )
    return response.choices[0].message.content

@retry_with_backoff
def ask_openrouter_direct(prompt):
    return ask_openrouter(prompt)

@retry_with_backoff
def ask_gemini_direct(prompt):
    return ask_gemini(prompt)

def ask_groq(prompt):
    """
    Tries Groq -> OpenRouter -> Gemini in sequence to ensure super fast and reliable responses.
    Each provider is retried with exponential backoff before falling back to the next.
    """
    errors = []
    
    # 1. Groq
    try:
        return ask_groq_direct(prompt)
    except Exception as e:
        errors.append(f"Groq failed: {e}")
        print(f"Groq failed: {e}. Falling back to OpenRouter...")
        
    # 2. OpenRouter
    try:
        return ask_openrouter_direct(prompt)
    except Exception as e:
        errors.append(f"OpenRouter failed: {e}")
        print(f"OpenRouter failed: {e}. Falling back to Gemini...")
        
    # 3. Gemini
    try:
        return ask_gemini_direct(prompt)
    except Exception as e:
        errors.append(f"Gemini failed: {e}")
        print(f"Gemini failed: {e}. All LLM providers exhausted.")
        
    raise RuntimeError(f"All LLM providers failed. Errors: {'; '.join(errors)}")