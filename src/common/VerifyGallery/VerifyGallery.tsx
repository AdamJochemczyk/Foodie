import React from "react";
import styles from "./VerifyGallery.module.css";

interface VerifyGalleryProperties {
  title: string;
  isLoading: boolean;
  children: React.ReactNode;
}

export const VerifyGallery = ({
  title,
  children,
  isLoading
}: VerifyGalleryProperties) => {
  return (
    <article className={styles.wrapper}>
      <h2 className={styles.title}>{title}</h2>
      <section className={styles.gallery}>
        {!isLoading ? children : <p>Loading...</p>}
      </section>
    </article>
  );
};
