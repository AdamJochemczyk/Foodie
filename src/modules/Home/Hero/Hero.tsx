import React from "react";
import { OrangeButton } from "../../../common/OrangeButton/OrangeButton";
import styles from "./Hero.module.css";

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroText}>
        <h1 className={styles.heroTitle}>Zacznij organizować swoje posiłki</h1>
        <p className={styles.heroDescription}>
          Z Foodie nie tylko <strong>zaoszczędzisz</strong> niewykorzystane
          resztki jedzenia, ale także przekonasz się, że w{" "}
          <strong>zdrowym ciele zdrowy duch!</strong>
        </p>
        <div className={styles.heroBtns}>
          <OrangeButton text="zobacz ofertę" size="small" />
          <OrangeButton
            text="przejdź do apki"
            size="small"
            variant="secondary"
          />
        </div>
      </div>
    </section>
  );
};
