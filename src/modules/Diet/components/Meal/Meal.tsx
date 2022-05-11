import React from "react";
import { LinkWrapper } from "src/common/LinkWrapper/LinkWrapper";
import { Button } from "src/common/Button/Button";
import styles from "./Meal.module.css";
import { usePlanMeal } from "../../hooks/usePlanMeal";
import { MealIngredients } from "./MealIngredients";

export const Meal = ({
  id,
  day,
  name
}: {
  id: string;
  day: string;
  name: string;
}) => {
  const createMealSlot = usePlanMeal();

  return (
    <div className={styles.box}>
      <p className={styles.mealName}>{name}</p>
      <div className={styles.items}>
        <MealIngredients mealId={id} />
      </div>
      <div className={styles.link}>
        {id !== "" ? (
          <LinkWrapper link={`/diet/${id}`}>
            <Button
              text={"Edit meal"}
              size="small"
              color="orange"
              variant="secondary"
            />
          </LinkWrapper>
        ) : (
          <Button
            text={"Plan meal"}
            size="small"
            color="orange"
            variant="primary"
            onClick={() => createMealSlot.mutate({ meal: name, day })}
          />
        )}
      </div>
    </div>
  );
};
