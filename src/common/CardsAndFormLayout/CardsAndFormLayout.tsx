import clsx from "clsx";
import React from "react";
import { SplashScreen } from "../SplashScreen/SplashScreen";
import styles from "./CardsAndFormLayout.module.css";

interface CardAndFormLayoutProperties {
  title: string;
  isLoading: boolean;
  cards: React.ReactNode;
  form: React.ReactNode;
}

export const CardsAndFormLayout = ({
  title,
  cards,
  form,
  isLoading
}: CardAndFormLayoutProperties) => {
  return (
    <article className={styles.wrapper}>
      <section className={styles.filters}>{form}</section>
      <section>
        <h2 className={styles.title}>{title}</h2>
        <div className={clsx(!isLoading && styles.cards)}>
          {!isLoading ? cards : <SplashScreen />}
        </div>
      </section>
    </article>
  );
};
