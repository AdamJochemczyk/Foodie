import React from "react";
import { useGetMealIngredients } from "../../hooks/useGetMealIngredients";
import { useChangeEatenStatus } from "../../hooks/useChangeEatenStatus";

export const MealIngredients = ({ mealId }: { mealId: string }) => {
  const { meal: ingredients, isLoading } = useGetMealIngredients({ mealId });
  const changeEatenStatus = useChangeEatenStatus({ mealId });

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    ingredient_id: string,
    type: "product" | "recipe"
  ) => {
    //TODO: add modal with info about dont revert product to fridge when want to unmark marked value
    changeEatenStatus.mutate({
      id: ingredient_id,
      type,
      marker: e.currentTarget.checked
    });
  };
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (ingredients.length === 0) {
    return <p>Meal not planned yet</p>;
  }
  return (
    <div>
      {ingredients.map(({ id, name, type, isEaten }) => (
        <div key={id}>
          <input
            type="checkbox"
            checked={isEaten}
            onChange={e => handleCheckboxChange(e, id, type)}
          />
          <span>{name}</span>
        </div>
      ))}
    </div>
  );
};
