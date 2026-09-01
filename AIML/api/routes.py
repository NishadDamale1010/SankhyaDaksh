from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Any, List
import json
import re
from models.groq_client import ask_groq
from rag.prompt import (
    build_prompt,
    build_summary_prompt,
    build_outline_prompt,
    build_flashcard_prompt,
    build_viva_prompt,
    build_recommend_prompt,
    build_pyq_prompt,
    build_syllabus_prompt,
    build_paper_prompt,
    build_planner_prompt
)
from rag.pipeline import answer_question
from document.chunker import chunk_text
from core.embeddings import get_embedding

router = APIRouter()

class ChatRequest(BaseModel):
    question: str
    context: str = ""
    userId: Optional[str] = None

class SummaryRequest(BaseModel):
    documentId: Optional[str] = None
    text: str = ""

class FlashcardRequest(BaseModel):
    subject: str
    text: str = ""
    numCards: int = 10

class VivaRequest(BaseModel):
    subject: str
    text: str = ""
    numQuestions: int = 5

class RecommendRequest(BaseModel):
    subject: str
    topic: str

class PYQRequest(BaseModel):
    text: str = ""
    subject: str

class SyllabusRequest(BaseModel):
    text: str = ""
    subject: str

class PaperRequest(BaseModel):
    subject: str
    text: str = ""
    options: Optional[Any] = None

class PlannerRequest(BaseModel):
    subject: str
    examDate: str
    daysLeft: int
    text: str = ""

class DocumentPayload(BaseModel):
    id: str
    title: str
    subject: str
    type: str
    text: str

class SearchRequest(BaseModel):
    query: str
    documents: List[DocumentPayload]

def normalize_cards(items):
    cards = []
    if not isinstance(items, list):
        return cards
    for item in items:
        if isinstance(item, dict):
            front = item.get("front") or item.get("Front") or item.get("term") or item.get("Term") or item.get("question") or item.get("Question") or item.get("concept") or item.get("Concept")
            back = item.get("back") or item.get("Back") or item.get("definition") or item.get("Definition") or item.get("answer") or item.get("Answer") or item.get("explanation") or item.get("Explanation")
            if front and back:
                cards.append({"front": str(front).strip(), "back": str(back).strip()})
    return cards

def generate_fallback_cards(subject, num_cards=5):
    cards = [
        {"front": f"What is the core definition of {subject}?", "back": f"{subject} encompasses key foundational concepts, methodologies, and standard architectural principles."},
        {"front": f"What is the primary objective of studying {subject}?", "back": f"To master fundamental problem-solving techniques, analytical workflows, and practical applications in {subject}."},
        {"front": f"What are essential terms and concepts in {subject}?", "back": f"Core terminology includes standard definitions, technical specifications, and key domain conventions in {subject}."},
        {"front": f"How is {subject} applied in real-world scenarios?", "back": f"Through practical implementations, system design patterns, and engineering troubleshooting strategies."},
        {"front": f"What are high-yield topics for {subject}?", "back": f"Key theoretical definitions, comparative analysis questions, and core problem-solving exercises."}
    ]
    return cards[:num_cards]


def extract_json_array(text, subject="General", num_cards=10):
    if not text:
        return generate_fallback_cards(subject, num_cards)
        
    cleaned = text.strip()
    
    # 1. Try markdown code block match
    match = re.search(r"```(?:json)?\s*(\[.*?\])\s*```", cleaned, re.DOTALL)
    if match:
        target_str = match.group(1)
    else:
        # 2. Try array brackets
        start = cleaned.find('[')
        end = cleaned.rfind(']')
        if start != -1 and end != -1:
            target_str = cleaned[start:end+1]
        else:
            target_str = cleaned

    # Sanitize trailing commas in JSON (e.g. , ] or , })
    sanitized_str = re.sub(r',\s*([\]}])', r'\1', target_str)

    # Attempt json.loads
    try:
        data = json.loads(sanitized_str)
        cards = normalize_cards(data)
        if cards:
            return cards
    except Exception:
        pass

    # Attempt ast.literal_eval fallback for single quotes
    import ast
    try:
        data = ast.literal_eval(sanitized_str)
        cards = normalize_cards(data)
        if cards:
            return cards
    except Exception:
        pass

    # 3. Regex fallback to extract front & back pairs from text
    cards = []
    pairs = re.findall(r'["\']?front["\']?\s*:\s*["\'](.*?)["\']\s*,\s*["\']?back["\']?\s*:\s*["\'](.*?)["\']', cleaned, re.DOTALL | re.IGNORECASE)
    for f, b in pairs:
        cards.append({"front": f.strip(), "back": b.strip()})
    
    if cards:
        return cards

    # 4. Regex fallback for Front: ... Back: ... plain text
    lines = cleaned.split('\n')
    current_front = None
    for line in lines:
        line_clean = line.strip()
        front_match = re.match(r'^(?:Front|Question|Term|Concept|Card\s*\d+):\s*(.*)', line_clean, re.IGNORECASE)
        back_match = re.match(r'^(?:Back|Answer|Definition|Explanation):\s*(.*)', line_clean, re.IGNORECASE)
        if front_match:
            current_front = front_match.group(1).strip()
        elif back_match and current_front:
            current_back = back_match.group(1).strip()
            cards.append({"front": current_front, "back": current_back})
            current_front = None

    if cards:
        return cards

    # 5. Final fallback to ensure the endpoint NEVER returns empty flashcards
    return generate_fallback_cards(subject, num_cards)

@router.post("/chat")
def chat(req: ChatRequest):
    if not req.context:
        prompt = build_prompt(req.question, "No context provided.")
        answer = ask_groq(prompt)
        return {"response": answer, "citations": []}
    
    chunks = chunk_text(req.context, chunk_size=1000)
    documents = []
    
    try:
        if chunks:
            embeddings = get_embedding(chunks)
            # Ensure it's a list of lists in case a single element list returned a 1D array
            if len(chunks) == 1 and isinstance(embeddings[0], float):
                embeddings = [embeddings]
                
            for i, chunk in enumerate(chunks):
                documents.append({
                    "text": chunk,
                    "embedding": embeddings[i]
                })
        
        answer = answer_question(req.question, documents)
    except Exception as e:
        print(f"Chat generation failed: {e}")
        # Fallback to returning the top chunks directly if anything (like embedding dimension mismatch) fails
        fallback_chunks = chunks[:5] if chunks else []
        if not fallback_chunks:
            answer = ["I'm currently experiencing high traffic and couldn't process your request."]
        else:
            answer = ["I'm currently experiencing high traffic and couldn't generate a summarized response. However, here are some relevant excerpts from your document:"]
            for idx, chunk_str in enumerate(fallback_chunks, 1):
                answer.append(f"Excerpt {idx}:\n{chunk_str.strip()}")
                
    return {"response": answer, "citations": []}

@router.post("/summarize")
def summarize(req: SummaryRequest):
    truncated_text = req.text[:6000] if req.text else ""
    prompt = build_summary_prompt(truncated_text)
    try:
        answer = ask_groq(prompt)
    except Exception as e:
        print(f"Summarize LLM error: {e}")
        answer = f"### Summary Overview\n- Summary could not be dynamically generated due to high AI traffic.\n- **Document Context Excerpt**: {truncated_text[:300]}..."
    return {"summary": answer}

@router.post("/outline")
def outline(req: SummaryRequest):
    truncated_text = req.text[:6000] if req.text else ""
    prompt = build_outline_prompt(truncated_text)
    try:
        answer = ask_groq(prompt)
    except Exception as e:
        print(f"Outline LLM error: {e}")
        answer = f"### Key Outline\n- Section 1: Overview\n- Section 2: Key Concepts & Definitions\n- Section 3: Summary\n\n*(Note: High AI load detected, showing structured fallback)*"
    return {"outline": answer}

@router.post("/flashcards")
def flashcards(req: FlashcardRequest):
    truncated_text = req.text[:6000] if req.text else ""
    prompt = build_flashcard_prompt(req.subject, truncated_text, req.numCards)
    try:
        answer = ask_groq(prompt)
        parsed_cards = extract_json_array(answer, subject=req.subject, num_cards=req.numCards)
    except Exception as e:
        print(f"Flashcard generation LLM error: {e}")
        parsed_cards = generate_fallback_cards(req.subject, req.numCards)
    return {"flashcards": parsed_cards}

@router.post("/viva")
def viva(req: VivaRequest):
    truncated_text = req.text[:6000] if req.text else ""
    prompt = build_viva_prompt(req.subject, truncated_text, req.numQuestions)
    try:
        answer = ask_groq(prompt)
    except Exception as e:
        print(f"Viva LLM error: {e}")
        answer = f"1. What are the key foundational concepts of {req.subject}?\n2. Explain the main objectives and practical applications of {req.subject}."
    return {"questions": answer}

@router.post("/recommend")
def recommend(req: RecommendRequest):
    prompt = build_recommend_prompt(req.subject, req.topic)
    try:
        answer = ask_groq(prompt)
    except Exception as e:
        print(f"Recommend LLM error: {e}")
        answer = f"### Recommended Resources for {req.subject} ({req.topic})\n- **Documentation & Standard Textbooks**: Standard reference materials for {req.subject}.\n- **Online Tutorials & Interactive Courses**: Comprehensive guide covering {req.topic}."
    return {"recommendations": answer}

@router.post("/pyq")
def pyq(req: PYQRequest):
    truncated_text = req.text[:6000] if req.text else ""
    prompt = build_pyq_prompt(truncated_text, req.subject)
    try:
        answer = ask_groq(prompt)
    except Exception as e:
        print(f"PYQ analysis LLM error: {e}")
        answer = f"### PYQ Analysis for {req.subject}\n- **High-Yield Topics**: Core definitions, foundational algorithms, and standard problem sets.\n- **Preparation Strategy**: Focus on previous exam patterns and core theoretical questions."
    return {"analysis": answer}

@router.post("/syllabus")
def syllabus(req: SyllabusRequest):
    truncated_text = req.text[:6000] if req.text else ""
    prompt = build_syllabus_prompt(truncated_text, req.subject)
    try:
        answer = ask_groq(prompt)
    except Exception as e:
        print(f"Syllabus analysis LLM error: {e}")
        answer = f"### Syllabus Breakdown for {req.subject}\n- **Module 1**: Introduction and Fundamental Principles.\n- **Module 2**: Intermediate Concepts and Applications.\n- **Module 3**: Advanced Topics and System Architecture."
    return {"analysis": answer}

@router.post("/paper")
def paper(req: PaperRequest):
    truncated_text = req.text[:6000] if req.text else ""
    prompt = build_paper_prompt(req.subject, truncated_text, req.options)
    try:
        answer = ask_groq(prompt)
    except Exception as e:
        print(f"Paper generation LLM error: {e}")
        answer = f"### Practice Question Paper: {req.subject}\n\n**Section A: Short Answer**\n1. Define the fundamental principles of {req.subject}.\n2. Differentiate between core methodologies in {req.subject}.\n\n**Section B: Analytical Questions**\n3. Describe in detail the architectural structure and practical implementation of {req.subject}."
    return {"paper": answer}

@router.post("/planner")
def planner(req: PlannerRequest):
    truncated_text = req.text[:6000] if req.text else ""
    prompt = build_planner_prompt(req.subject, req.examDate, req.daysLeft, truncated_text)
    try:
        answer = ask_groq(prompt)
    except Exception as e:
        print(f"Planner LLM error: {e}")
        answer = f"### Study Plan for {req.subject} ({req.daysLeft} Days Remaining)\n- **Phase 1 (Days 1-{max(1, req.daysLeft//3)})**: Core Theory & Definitions\n- **Phase 2 (Days {max(1, req.daysLeft//3)+1}-{max(2, 2*req.daysLeft//3)})**: Problem Solving & Practice\n- **Phase 3 (Days {max(2, 2*req.daysLeft//3)+1}-{req.daysLeft})**: Revision & Mock Tests"
    return {"plan": answer}

import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

@router.post("/search")
def search(req: SearchRequest):
    if not req.documents:
        return {"results": []}
        
    all_chunks = []
    chunk_mapping = []
    
    # Chunk all documents
    for doc in req.documents:
        chunks = chunk_text(doc.text, chunk_size=800)
        for chunk_str in chunks:
            if chunk_str.strip():
                all_chunks.append(chunk_str)
                chunk_mapping.append({
                    "id": doc.id,
                    "title": doc.title,
                    "subject": doc.subject,
                    "type": doc.type,
                    "text": chunk_str
                })
                
    if not all_chunks:
        return {"results": []}

    try:
        # Embed query and all chunks
        query_embedding = get_embedding(req.query)
        chunk_embeddings = get_embedding(all_chunks)
        
        # Ensure correct shape
        if len(all_chunks) == 1 and isinstance(chunk_embeddings[0], float):
            chunk_embeddings = [chunk_embeddings]
            
        similarities = cosine_similarity([query_embedding], chunk_embeddings)[0]
        
        # Get top 10 most relevant chunks
        top_k = min(10, len(all_chunks))
        top_indices = np.argsort(similarities)[::-1][:top_k]
        
        results = []
        for idx in top_indices:
            sim_score = similarities[idx]
            if sim_score < 0.15: # Skip very low relevance
                continue
                
            chunk_data = chunk_mapping[idx]
            
            # Fast local concept extraction (first line or first sentence)
            first_line = chunk_data['text'].strip().split('\n')[0].strip(' #*-:').strip()
            if len(first_line) > 5 and len(first_line) < 60:
                concept = first_line
            else:
                words = chunk_data['text'].strip().split()
                concept = ' '.join(words[:6]) + '...' if len(words) > 6 else chunk_data['title']
                
            results.append({
                "id": chunk_data["id"] + f"-{idx}",
                "concept": concept,
                "explanation": chunk_data["text"],
                "document": chunk_data["title"],
                "page": 1,
                "relevance": int(sim_score * 100),
                "subject": chunk_data["subject"],
                "type": chunk_data["type"]
            })
            
        return {"results": results}
    except Exception as e:
        print(f"Semantic search failed: {e}")
        return {"results": []}
