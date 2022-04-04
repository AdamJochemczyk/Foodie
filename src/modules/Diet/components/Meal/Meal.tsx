import React from "react";
import { LinkWrapper } from "src/common/LinkWrapper/LinkWrapper";
import { OrangeButton } from "src/common/OrangeButton/OrangeButton";
import { useGetMealIngredients } from "../../hooks/useGetMealIngredients";
import { MealIngredients } from "../MealIngredients/MealIngredients";
import styles from "./Meal.module.css";

export const Meal = ({ day, name }: { day: string; name: string }) => {
  const { entities, isLoading } = useGetMealIngredients({ day, name });
  return (
    <div className={styles.box}>
      <p className={styles.mealName}>{name}</p>
      <div className={styles.items}>
        <MealIngredients isLoading={isLoading} entities={entities} />
      </div>
      <div className={styles.link}>
        <LinkWrapper link={`/diet/123`}>
          <OrangeButton text={"Edit meal"} size="small" />
        </LinkWrapper>
      </div>
    </div>
  );
};
