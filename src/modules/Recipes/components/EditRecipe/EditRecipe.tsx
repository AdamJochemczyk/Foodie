import React from "react";
import { ActionButton } from "src/common/ActionButton/ActionButton";
import { useFindIngredients } from "src/modules/Recipes/hooks/useFindIngredients";
import { useGetRecipeById } from "src/modules/Recipes/hooks/useGetRecipeById";
import { RecipeAddEdit } from "src/modules/Recipes/components/RecipeAddEdit/RecipeAddEdit";
import { useDeleteRecipe } from "../../hooks/useDeleteRecipe";
import styles from "./EditRecipe.module.css";

export const EditRecipe = () => {
  const { recipe, isLoading } = useGetRecipeById();
  const { ingredients, isLoading: ingredientsLoading } = useFindIngredients();
  const deleteRecipe = useDeleteRecipe();

  return (
    <div className={styles.container}>
      {!isLoading && recipe ? (
        <div className={styles.content}>
          <RecipeAddEdit
            mode="edit"
            photoLink={recipe.photolink}
            ingredientsLoading={ingredientsLoading}
            initialValues={{
              title: recipe.title,
              description: recipe.description,
              recipetype: recipe.recipetype,
              mealportions: recipe.mealportions,
              kcalperportion: recipe.kcalperportion,
              isvegan: recipe.isvegan,
              isvegetarian: recipe.isvegetarian,
              photo: null,
              product: null,
              count: 0,
              measuretype: "",
              recipeproducts: ingredients.map(
                ({ id, name, measure, count }) => ({
                  product: {
                    value: id,
                    label: name
                  },
                  measuretype: measure,
                  count: count
                })
              ),
              imgCode: recipe.imgCode
            }}
          />
          <p>Provided by: {`${recipe.user.name} ${recipe.user.surname}`}</p>
          <ActionButton
            variant="danger"
            text="delete recipe"
            isLoading={deleteRecipe.isLoading}
            onClick={() =>
              deleteRecipe.mutate({
                id: recipe.recipeid,
                title: recipe.title,
                ingredients
              })
            }
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
