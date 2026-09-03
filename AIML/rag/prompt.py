def build_prompt(question, context):
    """
    Build prompt for LLM using retrieved context.
    """
    context_str = context[:6000] if context else "No context provided."
    prompt = f"""
You are an intelligent AI assistant for CampusOS.

Please answer the user's question. If context is provided below, use it to inform your answer. If the context does not contain the answer, or if no context is provided, answer using your general knowledge.

Context:
{context_str}

Question:
{question}

Answer:
"""
    return prompt

def build_summary_prompt(text):
    context_str = text[:6000] if text else "No text provided."
    return f"""
You are an AI assistant for CampusOS. Please provide a concise, well-structured summary of the following document.
Highlight the key points, main ideas, and critical takeaways using markdown bullet points and headings.

Document Context:
{context_str}

Summary:
"""

def build_outline_prompt(text):
    context_str = text[:6000] if text else "No text provided."
    return f"""
You are an AI assistant for CampusOS. Please provide a well-structured, hierarchical outline of the following document.
Use markdown headings, bullet points, and numbered lists to organize the content logically.

Document Context:
{context_str}

Outline:
"""

def build_flashcard_prompt(subject, text, num_cards):
    context_str = text[:6000] if text else "No document text provided. Generate based on general subject knowledge."
    return f"""
You are an AI assistant for CampusOS. Generate exactly {num_cards} high-quality interactive flashcards for the subject: {subject}.

STRICT FORMAT INSTRUCTIONS:
1. "front": MUST be a clear Question, Concept, or Term (e.g. "What is NAT?", "Define Virtual Memory").
2. "back": MUST be the Answer, Explanation, or Definition (e.g. "NAT maps private IP addresses to a public IP...").
3. Do NOT make the front and back identical. Front is the Question/Concept, Back is the Answer/Explanation.
4. Output ONLY a raw JSON array of objects with exact keys "front" and "back":
[
  {{"front": "Question or Term", "back": "Detailed Answer or Explanation"}}
]

Context:
{context_str}

Flashcards JSON:
"""


def build_viva_prompt(subject, text, num_questions):
    context_str = text[:6000] if text else "No context provided. Generate based on subject core topics."
    return f"""
You are an AI assistant for CampusOS. Generate {num_questions} viva/oral examination questions for the subject: {subject}.
Base the questions on the following context if provided. Provide the question and a brief expected answer for each.

Context:
{context_str}

Viva Questions:
"""

def build_recommend_prompt(subject, topic):
    return f"""
You are an AI assistant for CampusOS. Please recommend some high-quality learning resources (books, websites, courses, documentation) for the subject "{subject}", focusing on the topic "{topic}".
Format the recommendations in a clean, readable markdown format with headings and bullet points.

Recommendations:
"""

def build_pyq_prompt(text, subject):
    context_str = text[:6000] if text else "No PYQ text provided. Provide general exam analysis for " + subject + "."
    return f"""
You are an AI assistant for CampusOS. Analyze the following Previous Year Question (PYQ) paper for the subject: {subject}.
Identify the most frequently asked topics, important patterns, scoring questions, and provide actionable study insights for a student.

PYQ Context:
{context_str}

Analysis:
"""

def build_syllabus_prompt(text, subject):
    context_str = text[:6000] if text else "No syllabus text provided. Provide general syllabus breakdown for " + subject + "."
    return f"""
You are an AI assistant for CampusOS. Analyze the following syllabus for the subject: {subject}.
Break it down into manageable modules or key units, and give a brief overview of what each module entails.

Syllabus Context:
{context_str}

Syllabus Breakdown:
"""

def build_paper_prompt(subject, text, options):
    context_str = text[:6000] if text else "No context provided. Generate based on subject standard curriculum."
    return f"""
You are an AI assistant for CampusOS. Generate a practice question paper for the subject: {subject}.
Options / constraints: {options}.
Include Section A (Short questions), Section B (Medium/numerical questions), and Section C (Long analytical questions).

Context:
{context_str}

Question Paper:
"""

def build_planner_prompt(subject, exam_date, days_left, text):
    context_str = text[:6000] if text else "No detailed syllabus provided. Distribute key topics evenly."
    return f"""
You are an AI assistant for CampusOS. Create a structured study plan for a student preparing for the subject "{subject}".
The exam date is {exam_date}, which leaves {days_left} days for preparation.
Divide the available time into daily phases (e.g. Phase 1: Core Concepts, Phase 2: Problem Solving, Phase 3: Revision & Mock Tests).

Context / Syllabus:
{context_str}

Study Plan:
"""

def build_quiz_prompt(text, num_questions):
    context_str = text[:6000] if text else "No document text provided."
    return f"""
You are an AI assistant for CampusOS. Generate exactly {num_questions} multiple-choice questions (MCQs) based on the provided text.

STRICT FORMAT INSTRUCTIONS:
Output ONLY a raw JSON array of objects with exact keys "id", "question", "options" (an array of 4 strings), "answer" (the correct string matching one of the options), and "explanation".
Example format:
[
  {{
    "id": 1,
    "question": "What is the capital of France?",
    "options": ["Paris", "London", "Berlin", "Madrid"],
    "answer": "Paris",
    "explanation": "Paris is the capital and most populous city of France."
  }}
]

Context:
{context_str}

Quiz JSON:
"""