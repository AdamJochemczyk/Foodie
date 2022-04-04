import React from "react";

export const MealIngredients = ({
  isLoading,
  entities
}: {
  isLoading: boolean;
  entities: string[];
}) => {
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {entities.length > 0 ? (
        <div>
          {entities.map(el => (
            <p key={el}>{el}</p>
          ))}
        </div>
      ) : (
        <p>Meal not planned yet</p>
      )}
    </>
  );
};
