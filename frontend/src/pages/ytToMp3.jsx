import styles from "./pages.module.css";

export const YtToMp3 = () => {
  return (
    <>
      <div className={styles.container}>
        <h1>YT To MP3</h1>
        <input
          type="text"
          placeholder="YouTube Link"
          className={styles.linkInput}
        />
        <button>Download Audio</button>
      </div>
    </>
  );
};
