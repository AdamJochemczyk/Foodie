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
    const promises = recipeproducts.map(ingredient => {
      insertRecipeIngredient({
        productid: ingredient.product.value,
        recipeid: recipeId,
        productcount: ingredient.count,
        measure: ingredient.measuretype
      });
    });
    await Promise.all(promises);
  }
  if (error) {
    throw error;
  }
  return data;
};
