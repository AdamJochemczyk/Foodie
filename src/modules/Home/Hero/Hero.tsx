import React from "react";
import { LinkWrapper } from "src/common/LinkWrapper/LinkWrapper";
import { Button } from "src/common/Button/Button";
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
          <LinkWrapper link="#przepisy">
            <Button
              text="zobacz ofertę"
              size="small"
              color="orange"
              variant="primary"
            />
          </LinkWrapper>
          <LinkWrapper link="/auth/sign-in">
            <Button
              text="przejdź do apki"
              size="small"
              variant="secondary"
              color="orange"
            />
          </LinkWrapper>
        </div>
      </div>
    </section>
  );
};
