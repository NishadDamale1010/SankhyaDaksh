from document.parser import extract_text_from_pdf
from document.cleaner import clean_text
from document.chunker import chunk_text
from core.embeddings import get_embedding

text = extract_text_from_pdf("uploads/EXP NO. 3.pdf")

cleaned_text = clean_text(text)

chunks = chunk_text(cleaned_text)

print(f"Total Chunks: {len(chunks)}")

first_chunk = chunks[0]

embedding = get_embedding(first_chunk)

print(f"Embedding Length: {len(embedding)}")
print(first_chunk[:200])