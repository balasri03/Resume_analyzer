import { useState, useRef, useEffect } from "react";
import "../index.css";
import axios from "./Axios_config.js";
import ProgressChart from "./ProgressChart.jsx";

const UploadForm = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Add a ref for the result section
  const resultRef = useRef(null);

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [result]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile || !jobDescription) return;

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("jobDescription", jobDescription);

    setLoading(true);
    try {
      const res = await axios.post("/api/score", formData);
      setResult(res.data);
    } catch (err) {
      alert("Error analyzing files: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="mt-10 p-6 flex justify-center items-center w-1/2 h-1/2 text-center  rounded-xl ml-80"
        style={{ backgroundColor: "#2c2c2c", color: "#212529" }}>
        <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
          <div>
            <label className="text-xl semi-bold text-white mb-2">Upload Resume (PDF): </label><br />
            <input style={{ backgroundColor: "#f0f2f5" }} className="p-2 rounded" type="file" accept="application/pdf" onChange={(e) => setResumeFile(e.target.files[0])} />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <label className="text-xl semi-bold text-white mb-2">Paste Job Description:</label><br />
            <textarea
              className="p-2 rounded w-full"
              style={{ backgroundColor: "#f0f2f5" }}
              rows={6}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste or type the job description here..."
            />
          </div>
          <button className="p-3 w-full text-white text-xl rounded-lg" type="submit" disabled={loading}
            style={{ backgroundColor: "#0b5ed8", marginTop: "1rem" }}>
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </form>
        <br />
      </div>
      {result && (
        <div
          ref={resultRef}
          className="text-white mt-10 p-6 flex justify-center items-center w-1/2 h-1/2 text-center rounded-xl ml-80"
          style={{ backgroundColor: "#2c2c2c" }}>
          
          <div>
            <ProgressChart result={result} />
          </div>
<p>
  <strong>Unmatched Keywords:</strong>{" "}
  {result.unmatched_keywords && result.unmatched_keywords.length > 0
    ? result.unmatched_keywords.join(", ")
    : "None"}
</p>
        </div>
      )}
    </div>
  );
};

export default UploadForm;