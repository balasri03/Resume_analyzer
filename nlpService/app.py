from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer, util
import spacy
import re

app = Flask(__name__)
model = SentenceTransformer('all-MiniLM-L6-v2')  # Small, fast, accurate
nlp = spacy.load('en_core_web_sm')

def extract_skills_section(text):
    """
    Extracts the text under the 'Skills' or 'Technical Skills' section.
    Returns the section text or an empty string if not found.
    """
    pattern = re.compile(
        r"(skills|technical skills)\s*[:\-]?\s*(.*?)(?:\n\s*\n|$|education|projects|work experience|certifications|summary|professional experience)",
        re.IGNORECASE | re.DOTALL
    )
    match = pattern.search(text)
    if match:
        return match.group(2).strip()
    return ""

def extract_skills_from_jd(text):
    """
    Extracts skills from the 'Required Skills & Qualifications' section of a job description.
    Returns a set of cleaned skill strings.
    """
    pattern = re.compile(
        r"(required skills & qualifications|skills & qualifications|skills|qualifications)\s*[:\-]?\s*(.*?)(?:\n\s*\n|$|responsibilities|key responsibilities|about|description)",
        re.IGNORECASE | re.DOTALL
    )
    match = pattern.search(text)
    if not match:
        return set()
    section = match.group(2)
    skills = set()
    for line in section.splitlines():
        line = line.strip()
        if not line:
            continue
        # Remove leading dashes, bullets, or numbers
        line = re.sub(r"^[-•\d\.\s]+", "", line)
        # Remove trailing periods
        line = line.rstrip(".")
        if len(line) > 1:
            skills.add(line)
    return skills

def section_to_set(section_text):
    # Split by comma, semicolon, or newline, strip whitespace, and filter empty
    if isinstance(section_text, set):
        # Already a set, just lower-case all
        return set(skill.strip().lower() for skill in section_text if skill.strip())
    return set(
        skill.strip().lower()
        for skill in re.split(r"[,\n;]", section_text)
        if skill.strip()
    )

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    resume = data.get("resume", "")
    jd = data.get("jobDescription", "")

    # Embedding similarity (optional, not used for ATS score)
    embedding1 = model.encode(resume, convert_to_tensor=True)
    embedding2 = model.encode(jd, convert_to_tensor=True)
    similarity = util.pytorch_cos_sim(embedding1, embedding2).item()

    # Extract skills
    resume_skills_section = extract_skills_section(resume)
    jd_skills = extract_skills_from_jd(jd)

    resume_keywords = section_to_set(resume_skills_section or "")
    jd_keywords = section_to_set(jd_skills or "")

    # Defensive: ensure both are sets
    if not isinstance(resume_keywords, set):
        resume_keywords = set()
    if not isinstance(jd_keywords, set):
        jd_keywords = set()

    matched = sorted(jd_keywords & resume_keywords)
    unmatched = sorted(jd_keywords - resume_keywords)

    # ATS score: percent of JD skills present in resume
    score = int(len(matched) / len(jd_keywords) * 100) if jd_keywords else 0

    return jsonify({
        "score": score,
        "matched_keywords": matched,
        "unmatched_keywords": unmatched
    })

if __name__ == "__main__":
    app.run(port=5000)