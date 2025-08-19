import React, { useState } from "react";
import styles from "./pages.module.css";

export const ConvertImages = () => {
  const [files, setFiles] = useState([]);
  const [format, setFormat] = useState("png");

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleConvert = async () => {
    if (!files.length) {
      alert("Please select at least one file");
      return;
    }

    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
      formData.append("output_format", format);

      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/convert`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "converted_images.zip";
      a.click();
      window.URL.revokeObjectURL(url); // Clean up the URL object
    } catch (error) {
      console.error("Error during conversion:", error);
      alert("Error converting images. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Image Conversion</h1>
      <div className="row">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
        <select value={format} onChange={(e) => setFormat(e.target.value)}>
          <option value="png">PNG</option>
          <option value="jpg">JPG</option>
          <option value="webp">WEBP</option>
          <option value="ico">ICO</option>
        </select>
      </div>
      <button onClick={handleConvert}>Convert</button>
    </div>
  );
};
