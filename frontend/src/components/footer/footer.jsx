import React from "react";

import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.credit}>KD</h1>
      <div className={styles.social}>
        <a href="https://github.com/kaustubhdoval" target="_blank">
          <img
            height="28"
            width="28"
            src="https://cdn.simpleicons.org/github/grey"
          />
        </a>
        <a href="mailto:kaustubhdoval@gmail.com">
          <img
            height="28"
            width="28"
            src="https://cdn.simpleicons.org/mailboxdotorg/grey"
          />
        </a>
      </div>
    </section>
  );
};
