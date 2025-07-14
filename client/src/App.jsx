import React from "react";
import UploadForm from "./components/UploadForm";
import  "./index.css"
function App() {
  return (
    <div className="font-sans p-8">
      <h1 className="text-4xl text-white bold text-center">Resume vs JD Analyzer</h1>
      <UploadForm />
    </div>
  );
}

export default App;
