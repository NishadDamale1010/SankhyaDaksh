from core.embeddings import get_embedding
from rag.retriever import retrieve_similar_chunks
from rag.prompt import build_prompt
from models.groq_client import ask_groq


def answer_question(question, documents):
    # Generate query embedding
    query_embedding = get_embedding(question)

    if not documents:
        context = "No context provided."
        top_indices = []
    else:
        # Extract embeddings
        chunk_embeddings = [
            doc["embedding"]
            for doc in documents
        ]
    
        # Retrieve top chunks (retrieve 5 as requested for fallback)
        top_indices = retrieve_similar_chunks(
            query_embedding,
            chunk_embeddings,
            top_k=5
        )
    
        # Build context
        context = "\n\n".join(
            documents[i]["text"]
            for i in top_indices
        )

    # Build prompt
    prompt = build_prompt(
        question,
        context
    )

    try:
        # Generate answer
        answer = ask_groq(prompt)
    except Exception as e:
        if not documents:
            answer = "I'm currently experiencing high traffic and couldn't process your request. Please try again later."
        else:
            answer = "I'm currently experiencing high traffic and couldn't generate a summarized response. However, here are the most relevant excerpts from your document:\n\n"
            for idx, i in enumerate(top_indices, 1):
                chunk_text = documents[i]["text"].strip()
                answer += f"**Excerpt {idx}:**\n{chunk_text}\n\n"

    return answer