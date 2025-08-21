// frontend/src/App.jsx
import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [pages, setPages] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPages(res.data.pages);
    } catch (err) {
      console.error(err);
      alert("Error uploading PDF");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📄 PDF Slicer</h1>

      {/* File Upload */}
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Upload
      </button>

      {/* Display Extracted Pages */}
      <div className="mt-6 space-y-4">
        {pages.map((p) => (
          <div key={p.page} className="border p-3 rounded">
            <h2 className="font-semibold">Page {p.page}</h2>
            <p className="whitespace-pre-line">{p.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
