// frontend/src/components/UploadBox.jsx
import { useState } from "react";

export default function UploadBox({ onUpload, loading }) {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (file) onUpload(file);
  };

  return (
    <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow flex flex-col items-center">
      <input
        type="file"
        accept="application/pdf"
        onChange={handleChange}
        className="mb-4"
      />
      <button
        onClick={handleSubmit}
        disabled={!file || loading}
        className={`px-6 py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? "Uploading..." : "Upload PDF"}
      </button>
    </div>
  );
}
