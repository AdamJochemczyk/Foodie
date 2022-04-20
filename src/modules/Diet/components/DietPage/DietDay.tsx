import React from "react";
import { Meal } from "../Meal/Meal";
import styles from "./DietDay.module.css";

export const DietCards = ({ days }: { days: string[] }) => {
  return (
    <>
      {days.map(day => (
        <section key={day}>
          <p className={styles.title}>{day}</p>
          <div className={styles.container}>
            {["breakfast", "lunch", "dinner", "afternoon tea", "supper"].map(
              meal => (
                <Meal key={meal + day} day={day} name={meal} />
              )
            )}
          </div>
        </section>
      ))}
    </>
  );
};
