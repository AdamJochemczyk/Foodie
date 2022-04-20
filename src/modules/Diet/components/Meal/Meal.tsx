import React from "react";
import { LinkWrapper } from "src/common/LinkWrapper/LinkWrapper";
import { Button } from "src/common/Button/Button";
//import { useGetMealIngredients } from "../../hooks/useGetMealIngredients";
import styles from "./Meal.module.css";

//TODO: remove it
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Meal = ({ day, name }: { day: string; name: string }) => {
  //TODO: meal management
  //const { entities, isLoading } = useGetMealIngredients({ day, name });
  return (
    <div className={styles.box}>
      <p className={styles.mealName}>{name}</p>
      <div className={styles.items}>
        {/* <MealIngredients isLoading={isLoading} entities={entities} /> */}
      </div>
      <div className={styles.link}>
        <LinkWrapper link={`/diet/123`}>
          <Button
            text={"Edit meal"}
            size="small"
            color="orange"
            variant="primary"
          />
        </LinkWrapper>
      </div>
    </div>
  );
};
