# Resume Analyzer

**Resume Analyzer** is a simple yet effective NLP-powered tool that compares a user’s resume against a job description and computes a match score based on keyword overlap.

##  Features
- **Resume vs Job Description Matching** – Calculates how many keywords from the job description are also found in the resume.
- **Match Score Output** – Provides a numerical score (e.g., percentage) representing resume alignment.
- **Keyword Breakdown** – Highlights which keywords matched and which are missing for clarity.

##  Tech Stack
- Programming Language: Python
- NLP Libraries:  spaCy,sentence_transformers 
- Text Extraction: pdf-parse
- Express,Node,React,Mongodb,Tailwind CSS

##  Getting Started

### Prerequisites
- Python 3.x
- Required Python packages listed in `requirements.txt`

### Installation
```bash
git clone https://github.com/balasri03/Resume_analyzer.git
cd Resume_analyzer
source venv/bin/activate      # On Windows: venv\Scripts\activate
pip install -r requirements.txt
