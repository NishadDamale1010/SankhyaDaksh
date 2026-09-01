class VectorStore:
    def __init__(self):
        self.vectors = []

    def add_document(self, text, embedding):
        self.vectors.append({
            "text": text,
            "embedding": embedding
        })

    def get_all_documents(self):
        return self.vectors