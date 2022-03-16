import React from "react";
import { Layout } from "../../../src/common/Layout/Layout";
import { ProtectedWrapper } from "../../../src/common/ProtectedWrapper/ProtectedWrapper";
import { useFindIngredients } from "../../../src/modules/Recipes/hooks/useFindIngredients";
import { useGetRecipeById } from "../../../src/modules/Recipes/hooks/useGetRecipeById";
import { RecipeAddEdit } from "../../../src/modules/Recipes/RecipeAddEdit/RecipeAddEdit";

const VerifyRecipe = () => {
  const { recipe, isLoading } = useGetRecipeById();
  const { ingredients, isLoading: ingredientsLoading } = useFindIngredients();

  return (
    <ProtectedWrapper adminRestrictions>
      <Layout>
        {!isLoading ? (
          <RecipeAddEdit
            mode="edit"
            photoLink={recipe.photo_link}
            ingredientsLoading={ingredientsLoading}
            initialValues={{
              title: recipe.title,
              desc: recipe.description,
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
        ) : (
          <p>Loading...</p>
        )}
      </Layout>
    </ProtectedWrapper>
  );
};

export default VerifyRecipe;
