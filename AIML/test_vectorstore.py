from core.vectorstore import VectorStore

store = VectorStore()

store.add_document(
    text="Network Address Translation",
    embedding=[0.1, 0.2, 0.3]
)

print(store.get_all_documents())