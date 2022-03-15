import React from "react";
import { VerifyGallery } from "../../../common/VerifyGallery/VerifyGallery";
import { useSearchRecipes } from "../hooks/useSearchRecipes";
import { RecipeCard } from "../RecipeCard/RecipeCard";

export const RecipeVerifyGallery = () => {
  const { entities, isLoading } = useSearchRecipes(
    {
      title: "",
      recipeType: "",
      mealPortions: 0,
      kcalPerPortionFrom: 0,
      kcalPerPortionTo: 0,
      isVegan: false,
      isVegetarian: false,
      isFavorites: false
    },
    false
  );

  return (
    <VerifyGallery title="Przepisy do weryfikacji" isLoading={isLoading}>
      {entities.length > 0
        ? entities.map(
            ({
              title,
              recipe_id,
              photo_link,
              meal_portions,
              kcal_per_portion,
              isvegetarian,
              isvegan,
              description,
              recipe_type
            }) => (
              <RecipeCard
                key={recipe_id}
                photoLink={photo_link}
                title={title}
                description={description}
                recipeType={recipe_type}
                mealPortions={meal_portions}
                kcalPerPortions={kcal_per_portion}
                isVegan={isvegan}
                isVegetarian={isvegetarian}
                recipeId={recipe_id}
                href={`/recipes/verify/${recipe_id}`}
                btnText="Sprawdź przepis..."
              />
            )
          )
        : "Wszystkie przepisy zostały zweryfikowane"}
    </VerifyGallery>
  );
};
