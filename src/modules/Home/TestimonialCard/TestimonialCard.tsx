import Image from "next/image";
import React from "react";
import styles from "./TestimonialCard.module.css";

interface TestimonialCardProperties {
  name: string;
  surname: string;
  imgSrc: string;
  text: string;
}

export const TestimonialCard = ({
  name,
  surname,
  imgSrc,
  text
}: TestimonialCardProperties) => {
  return (
    <section className={styles.card}>
      <div className={styles.cardTestimonial}>{text}</div>
      <div className={styles.personImage}>
        <Image src={imgSrc} alt="person" width={200} height={200} />
      </div>
      <p className={styles.personData}>
        {name} {surname}
      </p>
    </section>
  );
};
