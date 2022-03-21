import { supabase } from "src/utils/supabaseClient";
import { RecipeProperties } from "../types";
import { insertRecipeIngredient } from "./insertRecipeIngredient";

export const insertRecipe = async (values: RecipeProperties) => {
  const { data, error } = await supabase.from("recipes").insert(values);
  const recipeId = data ? (data[0].recipe_id as string) : "";
  if (recipeId && values.recipeProducts.length > 0) {
    const promises = values.recipeProducts.map(ingredient => {
      insertRecipeIngredient({
        productid: ingredient.product.value,
        recipeid: recipeId,
        productcount: ingredient.count,
        measure: ingredient.measureType
      });
    });
    await Promise.all(promises);
  }
  if (error) {
    throw error;
  }
  return data;
};
