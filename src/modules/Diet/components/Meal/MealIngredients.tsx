import React from "react";

export const MealIngredients = ({
  ingredients
}: {
  ingredients: { name: string; type: string; id: string }[];
}) => {
  if (ingredients.length === 0) {
    return <p>Meal not planned yet</p>;
  }
  return (
    <div>
      {ingredients.map(({ id, name, type }) => (
        <p key={id}>
          {type}:{name}
        </p>
      ))}
    </div>
  );
};
