import React, { useCallback } from "react";
import { definitions } from "types/supabase";
import { Meal } from "../Meal/Meal";
import styles from "./DietCards.module.css";

export const DietCards = ({
  days,
  entities
}: {
  days: string[];
  entities: definitions["usermeal"][];
}) => {
  const getMealId = useCallback(
    (day: string, meal: string) => {
      const filtered = entities.filter(
        entity => entity.mealdate === day && entity.mealname === meal
      );
      return filtered[0]?.id || "";
    },
    [entities]
  );

  return (
    <>
      {entities &&
        days.map(day => (
          <section key={day}>
            <p className={styles.title}>{day}</p>
            <div className={styles.container}>
              {["breakfast", "lunch", "dinner", "afternoon tea", "supper"].map(
                meal => (
                  <Meal
                    key={meal + day}
                    name={meal}
                    day={day}
                    id={getMealId(day, meal)}
                  />
                )
              )}
            </div>
          </section>
        ))}
    </>
  );
};
