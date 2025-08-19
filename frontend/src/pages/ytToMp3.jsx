import styles from "./pages.module.css";
import React, { useState } from "react";

export const YtToMp3 = () => {
  const [yt_link, setYtLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLinkChange = (e) => {
    setYtLink(e.target.value);
  };

  const handleDownload = async () => {
    if (!yt_link) {
      alert("Please Enter a Link");
      return;
    }

    setIsLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const formData = new FormData();
      formData.append("yt_link", yt_link);

      const response = await fetch(`${API_URL}/yt_to_mp3`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      const contentDisposition = response.headers.get("Content-Disposition");
      const filename = contentDisposition?.split("filename=")[1] || "audio.mp3";

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download error:", err);
      alert("Failed to download MP3. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h1>YT To MP3</h1>
        <input
          type="text"
          placeholder="YouTube Link"
          value={yt_link}
          className={styles.linkInput}
          onChange={handleLinkChange}
          disabled={isLoading}
        />
        <button
          onClick={handleDownload}
          disabled={isLoading}
          className={isLoading ? styles.loadingButton : ""}
        >
          {isLoading ? "Converting..." : "Download Audio"}
        </button>
        {isLoading && <div className={styles.loadingText}>Loading...</div>}
      </div>
    </>
  );
};
