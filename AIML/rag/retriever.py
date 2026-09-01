from sklearn.metrics.pairwise import cosine_similarity
import numpy as np


def retrieve_similar_chunks(query_embedding, chunk_embeddings, top_k=3):
    """
    Retrieve most similar chunks using cosine similarity.
    """

    similarities = cosine_similarity(
        [query_embedding],
        chunk_embeddings
    )[0]

    top_indices = np.argsort(similarities)[::-1][:top_k]

    return top_indices.tolist()