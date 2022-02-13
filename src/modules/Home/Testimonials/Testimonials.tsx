import React from "react";
import { testimonials } from "../constants";
import { TestimonialCard } from "../TestimonialCard/TestimonialCard";
import styles from "./Testimonials.module.css";

export const Testimonials = () => {
  return (
    <section id="opinie" className={styles.testimonialsSection}>
      <p className={styles.testimonials}>Opinie</p>
      <div className={styles.testimonialsBox}>
        {testimonials.map(({ name, surname, imgSrc, text }) => (
          <TestimonialCard
            key={name + text}
            name={name}
            surname={surname}
            imgSrc={imgSrc}
            text={text}
          />
        ))}
      </div>
    </section>
  );
};
