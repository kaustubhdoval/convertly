import styles from "./pages.module.css";

export const YtToMp4 = () => {
  return (
    <>
      <div className={styles.container}>
        <h1>YT To MP4</h1>
        <input
          type="text"
          placeholder="YouTube Link"
          className={styles.linkInput}
        />
        <button>Download Video</button>
      </div>
    </>
  );
};
