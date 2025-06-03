import styles from "./moreTools.module.css";

import { useNavigate } from "react-router-dom";

export const MoreTools = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h3>More Tools</h3>
      <div className={styles.bigFish}>
        <button
          onClick={() => {
            navigate("/yt-to-mp3");
          }}
        >
          YT to MP3
        </button>
        <button
          onClick={() => {
            navigate("/yt-to-mp4");
          }}
        >
          YT to MP4
        </button>
        <button
          onClick={() => {
            navigate("/image-resizer");
          }}
        >
          Image Resizer
        </button>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Image Converter
        </button>
      </div>
    </div>
  );
};
