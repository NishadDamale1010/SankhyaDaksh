from core.embeddings import get_embedding

embedding = get_embedding("Hello CampusOS AI")

print(f"Vector Length: {len(embedding)}")
print(embedding[:10])