import React from "react";

import styles from "./Header.module.css";

export const Header = () => {
  const backendUrl = import.meta.env.VITE_API_URL;
  const docsUrl = backendUrl + "/docs";

  return (
    <section className={styles.container}>
      <a href="/">
        <h1 className={styles.credit}>Convertly</h1>
      </a>
      <div className={styles.social}>
        <a href={docsUrl}>Docs</a>
        <a href="https://github.com/kaustubhdoval/convertly" target="_blank">
          <img
            height="25"
            width="25"
            src="https://cdn.simpleicons.org/github/white"
          />
        </a>
      </div>
    </section>
  );
};
