import React from "react";

import styles from "./Header.module.css";

export const Header = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.credit}>Convertly</h1>
      <div className={styles.social}>
        <a href="https://github.com/kaustubhdoval/convertly" target="_blank">
          <img
            height="38"
            width="38"
            src="https://cdn.simpleicons.org/github/black"
          />
        </a>
      </div>
    </section>
  );
};
