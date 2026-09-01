from core.embeddings import get_embedding
from rag.retriever import retrieve_similar_chunks

chunks = [
    "Network Address Translation is used to map private IP addresses to public IP addresses.",
    "Python is a popular programming language for AI and ML.",
    "MongoDB Atlas supports vector search."
]

chunk_embeddings = [
    get_embedding(chunk)
    for chunk in chunks
]

query = "How does NAT work?"

query_embedding = get_embedding(query)

results = retrieve_similar_chunks(
    query_embedding,
    chunk_embeddings
)

print("Top Matching Chunk Indexes:")
print(results)