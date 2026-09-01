from document.parser import extract_text_from_pdf
from document.cleaner import clean_text
from document.chunker import chunk_text

text = extract_text_from_pdf("uploads/EXP NO. 3.pdf")

cleaned_text = clean_text(text)

chunks = chunk_text(cleaned_text)

print(f"Total Chunks: {len(chunks)}")
print("\nFirst Chunk:\n")
print(chunks[0])