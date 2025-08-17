import React, { useState } from "react";
import styles from "./pages.module.css";

export const ImageResizer = () => {
  const [files, setFiles] = useState([]);
  const [height, setHeight] = useState(200);
  const [width, setWidth] = useState(200);

  const handleFileChange = (e) => {
    // Convert FileList to array
    setFiles(Array.from(e.target.files));
  };

  const handleHeightChange = (e) => {
    setHeight(parseInt(e.target.value) || 0);
  };

  const handleWidthChange = (e) => {
    setWidth(parseInt(e.target.value) || 0);
  };

  const handleResize = async () => {
    if (!files.length) {
      alert("Please select at least one file");
      return;
    }

    if (!height && !width) {
      alert("Please specify at least one dimension (width or height)");
      return;
    }

    try {
      const formData = new FormData();
      // Append each file with 'files' as the key (matches backend expectation)
      files.forEach((file) => {
        formData.append("files", file);
      });

      // Only append dimensions if they have values
      if (width) formData.append("resize_width", width.toString());
      if (height) formData.append("resize_height", height.toString());

      const API_URL = import.meta.env.VITE_API_URL;

      const response = await fetch(`${API_URL}/resize`, {
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
      a.download = "resized_images.zip";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error details:", error);
      if (error.message.includes("Failed to fetch")) {
        alert(
          "Cannot connect to server. Please make sure the backend is running."
        );
      } else {
        alert(`Error resizing images: ${error.message}`);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1>Image Resizer</h1>
      <input
        className={styles.fileInput}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
      />
      <div className={styles.config}>
        <h3>Width: </h3>
        <input
          type="number"
          value={width}
          onChange={handleWidthChange}
          placeholder="pixels"
        />
        <h3>Height: </h3>
        <input
          type="number"
          value={height}
          onChange={handleHeightChange}
          placeholder="pixels"
        />
      </div>
      <button onClick={handleResize}>Resize</button>
    </div>
  );
};
