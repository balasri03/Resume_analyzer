from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer, util
import spacy
import re
import string

app = Flask(__name__)

# ✅ Load models
model = SentenceTransformer('all-MiniLM-L6-v2')  # Small, fast, accurate
nlp = spacy.load('en_core_web_sm')


def extract_skills_section(text):
    """
    Extracts text under 'Skills' or 'Technical Skills' section (if exists).
    Returns empty string if not found.
    """
    pattern = re.compile(
        r"(skills|technical skills|technical expertise|core competencies)\s*[:\-]?\s*(.*?)(?:\n\s*\n|$|education|projects|work experience|certifications|summary|professional experience)",
        re.IGNORECASE | re.DOTALL
    )
    match = pattern.search(text)
    if match:
        return match.group(2).strip()
    return ""


def extract_skills_from_jd(text):
    pattern = re.compile(
        r"(required skills & qualifications|skills & qualifications|skills|qualifications)\s*[:\-]?\s*(.*?)(?:\n\s*\n|$|responsibilities|key responsibilities|about|description)",
        re.IGNORECASE | re.DOTALL
    )
    match = pattern.search(text)
    if not match:
        return set()
    section = match.group(2)

    # ✅ Split entire section into words
    cleaned = section.lower().translate(str.maketrans('', '', string.punctuation))
    return set(word.strip() for word in cleaned.split() if len(word.strip()) > 1)



def section_to_set(section_text):
    """
    Converts a string or set into a clean set of lowercase keywords.
    Removes punctuation, filler words, and splits by spaces as well.
    """
    filler_words = {"proficiency", "in", "with", "and", "to", "of", "on", "the", "a"}

    # ✅ If already a set
    if isinstance(section_text, set):
        return set(
            skill.strip().lower().translate(str.maketrans('', '', string.punctuation))
            for skill in section_text if skill.strip()
        )

    # ✅ If string
    cleaned = section_text.lower().translate(str.maketrans('', '', string.punctuation))
    tokens = [w.strip() for w in re.split(r"[,\n; ]", cleaned) if len(w.strip()) > 1]

    # ✅ Remove filler words
    return set([t for t in tokens if t not in filler_words])



@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    resume = data.get("resume", "")
    jd = data.get("jobDescription", "")

    # ✅ Embedding similarity (optional, just for reference)
    embedding1 = model.encode(resume, convert_to_tensor=True)
    embedding2 = model.encode(jd, convert_to_tensor=True)
    similarity = util.pytorch_cos_sim(embedding1, embedding2).item()

    # ✅ Extract keywords (use full text if sections not found)
    resume_keywords = section_to_set(resume)
    jd_skills = extract_skills_from_jd(jd)
    jd_keywords = section_to_set(jd_skills if jd_skills else jd)


    matched = sorted(jd_keywords & resume_keywords)
    unmatched = sorted(jd_keywords - resume_keywords)

    # ✅ ATS Score Calculation
    score = int(len(matched) / len(jd_keywords) * 100) if jd_keywords else 0

    # ✅ Debug Logs
    print("Similarity Score:", similarity)
    print("Resume Keywords Sample:", list(resume_keywords)[:20])
    print("JD Keywords Sample:", list(jd_keywords)[:20])
    print("Matched:", matched)
    print("Unmatched:", unmatched)

    return jsonify({
        "score": score,
        "matched_keywords": matched,
        "unmatched_keywords": unmatched
    })


if __name__ == "__main__":
    app.run(port=5000)
