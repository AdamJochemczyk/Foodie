import React from "react";
import { ActionButton } from "src/common/ActionButton/ActionButton";
import { useFindIngredients } from "src/modules/Recipes/hooks/useFindIngredients";
import { useGetRecipeById } from "src/modules/Recipes/hooks/useGetRecipeById";
import { RecipeAddEdit } from "src/modules/Recipes/components/RecipeAddEdit/RecipeAddEdit";
import { useDeleteRecipe } from "../../hooks/useDeleteRecipe";

export const EditRecipe = () => {
  const { recipe, isLoading } = useGetRecipeById();
  const { ingredients, isLoading: ingredientsLoading } = useFindIngredients();
  const deleteRecipe = useDeleteRecipe();

  return (
    <>
      {!isLoading ? (
        <>
          <RecipeAddEdit
            mode="edit"
            photoLink={recipe.photo_link}
            ingredientsLoading={ingredientsLoading}
            initialValues={{
              title: recipe.title,
              description: recipe.description,
              recipeType: recipe.recipe_type,
              mealPortions: recipe.meal_portions,
              kcalPerPortion: recipe.kcal_per_portion,
              isVegan: recipe.isvegan,
              isVegetarian: recipe.isvegan,
              photo: null,
              product: null,
              count: 0,
              measureType: "",
              recipeProducts: ingredients.map(
                ({ id, name, measure, count }) => ({
                  product: {
                    value: id,
                    label: name
                  },
                  measureType: measure,
                  count: count
                })
              )
            }}
          />
          <p>Zgloszone przez: {recipe?.user?.email}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <ActionButton
        variant="danger"
        text="usuń przepis"
        onClick={() =>
          deleteRecipe.mutate({
            id: recipe.recipe_id,
            title: recipe.title,
            ingredients
          })
        }
      />
    </>
  );
};
