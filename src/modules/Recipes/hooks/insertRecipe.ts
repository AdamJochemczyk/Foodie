import { supabase } from "src/utils/supabaseClient";
import { RecipeProperties } from "../types";
import { insertRecipeIngredient } from "./insertRecipeIngredient";

export const insertRecipe = async ({
  title,
  photolink,
  description,
  recipetype,
  mealportions,
  kcalperportion,
  proposaluserid,
  isvegan,
  isvegetarian,
  recipeproducts,
  uuid
}: RecipeProperties) => {
  const { data, error } = await supabase.from("recipes").insert({
    title: title,
    photolink: photolink,
    description: description,
    recipetype: recipetype,
    mealportions: mealportions,
    kcalperportion: kcalperportion,
    proposaluserid: proposaluserid,
    isvegan: isvegan,
    isvegetarian: isvegetarian,
    imgCode: uuid
  });
  const recipeId = data ? (data[0].recipeid as string) : "";
  if (recipeId && recipeproducts.length > 0) {
    const recipeIngredients = recipeproducts.map(ingredient => ({
      productid: ingredient.product.value,
      recipeid: recipeId,
      productcount: ingredient.count,
      measure: ingredient.measuretype
    }));
    await insertRecipeIngredient(recipeIngredients);
  }
  if (error) {
    throw error;
  }
  return data;
};
