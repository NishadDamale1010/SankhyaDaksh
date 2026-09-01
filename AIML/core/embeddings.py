import os
import requests
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
HF_API_KEY = os.getenv("HF_API_KEY")
HF_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
HF_API_URL = f"https://api-inference.huggingface.co/pipeline/feature-extraction/{HF_MODEL}"

_local_model = None


def _get_local_model():
    """Lazy-load the local sentence-transformers model (only if cloud APIs are unavailable)."""
    global _local_model
    if _local_model is None:
        from sentence_transformers import SentenceTransformer
        _local_model = SentenceTransformer("all-MiniLM-L6-v2")
    return _local_model


def get_embedding(text):
    """
    Generate embedding for text.
    Prioritizes Gemini API for extreme speed and reliability.
    Falls back to HuggingFace Inference API, then local model.
    Accepts a single string or a list of strings.
    """
    is_list = isinstance(text, list)
    texts = text if is_list else [text]

    if GEMINI_API_KEY:
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:batchEmbedContents?key={GEMINI_API_KEY}"
            all_embeddings = []
            batch_size = 50
            for i in range(0, len(texts), batch_size):
                batch_texts = texts[i:i + batch_size]
                requests_payload = [
                    {"model": "models/gemini-embedding-001", "content": {"parts": [{"text": t}]}}
                    for t in batch_texts
                ]
                response = requests.post(url, json={"requests": requests_payload}, timeout=15)
                response.raise_for_status()
                data = response.json()
                batch_embeddings = [item["values"] for item in data["embeddings"]]
                all_embeddings.extend(batch_embeddings)
            
            return all_embeddings if is_list else all_embeddings[0]
        except Exception as e:
            print(f"Gemini API failed: {e}. Falling back to HuggingFace/Local.")

    if HF_API_KEY:
        try:
            all_embeddings = []
            batch_size = 50
            for i in range(0, len(texts), batch_size):
                batch_texts = texts[i:i + batch_size]
                response = requests.post(
                    HF_API_URL,
                    headers={"Authorization": f"Bearer {HF_API_KEY}"},
                    json={"inputs": batch_texts, "options": {"wait_for_model": True}},
                    timeout=30
                )
                response.raise_for_status()
                batch_embeddings = response.json()
                # HF sometimes returns 1D array if 1 item, or 2D if multiple
                if len(batch_texts) == 1 and isinstance(batch_embeddings[0], float):
                    batch_embeddings = [batch_embeddings]
                all_embeddings.extend(batch_embeddings)
            
            return all_embeddings if is_list else all_embeddings[0]
        except Exception as e:
            print(f"HuggingFace API failed: {e}. Falling back to local model.")

    try:
        model = _get_local_model()
        embedding = model.encode(texts)
        return embedding.tolist() if is_list else embedding[0].tolist()
    except ImportError:
        raise RuntimeError("Local embedding model fallback failed because 'sentence-transformers' is not installed. "
                           "Please ensure your Gemini/HuggingFace API keys are valid or install sentence-transformers.")