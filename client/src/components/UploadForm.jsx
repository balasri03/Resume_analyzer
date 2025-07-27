// import { useState, useRef, useEffect } from "react";
// import "../index.css";
// import axios from "./Axios_config.js";
// import ProgressChart from "./ProgressChart.jsx";

// const UploadForm = () => {
//   const [resumeFile, setResumeFile] = useState(null);
//   const [jobDescription, setJobDescription] = useState("");
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Add a ref for the result section
//   const resultRef = useRef(null);

//   useEffect(() => {
//     if (result && resultRef.current) {
//       resultRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [result]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!resumeFile || !jobDescription) return;

//     const formData = new FormData();
//     formData.append("resume", resumeFile);
//     formData.append("jobDescription", jobDescription);

//     setLoading(true);
//     try {
//       const res = await axios.post("/api/score", formData);
//       setResult(res.data);
//     } catch (err) {
//       alert("Error analyzing files: " + err.message);
//     }
//     setLoading(false);
//   };

//   return (
//     <div>
//       <div className="mt-10 p-6 flex justify-center items-center w-1/2 h-1/2 text-center  rounded-xl ml-80"
//         style={{ backgroundColor: "#2c2c2c", color: "#212529" }}>
//         <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
//           <div>
//             <label className="text-xl semi-bold text-white mb-2">Upload Resume (PDF): </label><br />
//             <input style={{ backgroundColor: "#f0f2f5" }} className="p-2 rounded" type="file" accept="application/pdf" onChange={(e) => setResumeFile(e.target.files[0])} />
//           </div>
//           <div style={{ marginTop: "1rem" }}>
//             <label className="text-xl semi-bold text-white mb-2">Paste Job Description:</label><br />
//             <textarea
//               className="p-2 rounded w-full"
//               style={{ backgroundColor: "#f0f2f5" }}
//               rows={6}
//               value={jobDescription}
//               onChange={(e) => setJobDescription(e.target.value)}
//               placeholder="Paste or type the job description here..."
//             />
//           </div>
//           <button className="p-3 w-full text-white text-xl rounded-lg" type="submit" disabled={loading}
//             style={{ backgroundColor: "#0b5ed8", marginTop: "1rem" }}>
//             {loading ? "Analyzing..." : "Analyze"}
//           </button>
//         </form>
//         <br />
//       </div>
//       {result && (
//         <div
//           ref={resultRef}
//           className="text-white mt-10 p-6 flex justify-center items-center w-1/2 h-1/2 text-center rounded-xl ml-80"
//           style={{ backgroundColor: "#2c2c2c" }}>
          
//           <div>
//             <ProgressChart result={result} />
//           </div>
// <p>
//   <strong>Unmatched Keywords:</strong>{" "}
//   {result.unmatched_keywords && result.unmatched_keywords.length > 0
//     ? result.unmatched_keywords.join(", ")
//     : "None"}
// </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UploadForm;



// import { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";
// import "../index.css";
// import axios from "./Axios_config.js";
// import ProgressChart from "./ProgressChart.jsx";

// const UploadForm = () => {
//   const [resumeFile, setResumeFile] = useState(null);
//   const [jobDescription, setJobDescription] = useState("");
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const resultRef = useRef(null);

//   useEffect(() => {
//     if (result && resultRef.current) {
//       resultRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [result]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!resumeFile || !jobDescription) return;

//     const formData = new FormData();
//     formData.append("resume", resumeFile);
//     formData.append("jobDescription", jobDescription);

//     setLoading(true);
//     try {
//       const res = await axios.post("/api/score", formData);
//       setResult(res.data);
//     } catch (err) {
//       alert("Error analyzing files: " + err.message);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="flex flex-col items-center mt-10">
//       {/* Form Section */}
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="bg-neutral-800 text-white rounded-xl p-6 w-full max-w-2xl shadow-xl"
//       >
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-lg font-semibold mb-2">
//               Upload Resume (PDF):
//             </label>
//             <input
//               type="file"
//               accept="application/pdf"
//               onChange={(e) => setResumeFile(e.target.files[0])}
//               className="w-full bg-gray-100 text-black rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-lg font-semibold mb-2">
//               Paste Job Description:
//             </label>
//             <textarea
//               rows={6}
//               value={jobDescription}
//               onChange={(e) => setJobDescription(e.target.value)}
//               placeholder="Paste or type the job description here..."
//               className="w-full bg-gray-100 text-black rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white text-lg rounded-lg p-3 shadow-md disabled:opacity-50"
//           >
//             {loading ? "Analyzing..." : "Analyze"}
//           </button>
//         </form>
//       </motion.div>

//       {/* Result Section */}
//       {result && (
//         <motion.div
//           ref={resultRef}
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="bg-neutral-800 text-white rounded-xl p-6 w-full max-w-2xl mt-10 shadow-xl text-center"
//         >
//           <div className="mb-4">
//             <ProgressChart result={result} />
//           </div>
//           <div>
//             <p className="text-lg">
//             <strong>Unmatched Keywords:</strong>{" "}
//             {result.unmatched_keywords && result.unmatched_keywords.length > 0
//               ? result.unmatched_keywords.join(", ")
//               : "None"}
//           </p>
//           </div>
//         </motion.div>
//       )}
//     </div>
//   );
// };

// export default UploadForm;



import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import "../index.css";
import axios from "./Axios_config.js";
import ProgressChart from "./ProgressChart.jsx";

const UploadForm = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

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
      <h2 className="text-4xl font-bold mb-4 text-center text-black-400">
          Resume Analyzer
        </h2>
    <div className="flex flex-col items-center mt-10 bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen py-10">
      {/* Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-md bg-white/10 text-white rounded-2xl p-8 w-full max-w-2xl shadow-2xl border border-white/20"
      >
        

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-lg font-semibold mb-2">
              Upload Resume (PDF):
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setResumeFile(e.target.files[0])}
              className="w-full bg-gray-100 text-black rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2">
              Paste Job Description:
            </label>
            <textarea
              rows={6}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste or type the job description here..."
              className="w-full bg-gray-100 text-black rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 transition-transform duration-300 text-white text-lg rounded-lg p-3 shadow-md flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8h4z"
                  ></path>
                </svg>
                Analyzing...
              </>
            ) : (
              "Analyze"
            )}
          </button>
        </form>
      </motion.div>

      {/* Result Section */}
      {result && (
        <motion.div
          ref={resultRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="backdrop-blur-md bg-white/10 text-white rounded-2xl p-6 w-full max-w-2xl mt-10 shadow-2xl border border-white/20 text-center"
        >
          <div className="mb-4 ml-50">
            <ProgressChart result={result} />
          </div>

          <p className="text-lg mb-2">
            <strong className="text-blue-400">Unmatched Keywords:</strong>
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {result.unmatched_keywords && result.unmatched_keywords.length > 0
              ? result.unmatched_keywords.map((keyword, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-red-600/80 px-3 py-1 rounded-full text-sm shadow-md"
                  >
                    {keyword}
                  </motion.span>
                ))
              : "None"}
          </div>
        </motion.div>
      )}
    </div>
    </div>
  );
};

export default UploadForm;
