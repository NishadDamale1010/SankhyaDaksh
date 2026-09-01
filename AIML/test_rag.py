from core.embeddings import get_embedding
from core.vectorstore import VectorStore
from rag.pipeline import answer_question

store = VectorStore()

text = """
Network Address Translation (NAT) is a method that maps
private IP addresses to public IP addresses.
It allows devices in a local network to communicate
with the Internet.
"""

embedding = get_embedding(text)

store.add_document(
    text,
    embedding
)

question = "How does NAT work?"

answer = answer_question(
    question,
    store.get_all_documents()
)

print("\nAnswer:\n")
print(answer)