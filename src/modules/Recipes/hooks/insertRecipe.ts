import { supabase } from "../../../utils/supabaseClient";
import { insertRecipeIngredient } from "./insertRecipeIngredient";
import { RecipeProducts } from "./useCreateRecipe";
interface RecipeProperties {
  photoLink: string;
  title: string;
  desc: string;
  recipeType: string;
  mealPortions: number;
  kcalPerPortion: number;
  isVegan: boolean;
  isVegetarian: boolean;
  proposalUserId: string;
  recipeProducts: RecipeProducts[];
}

export const insertRecipe = async ({
  photoLink,
  title,
  desc,
  recipeType,
  mealPortions,
  kcalPerPortion,
  isVegan,
  isVegetarian,
  proposalUserId,
  recipeProducts
}: RecipeProperties) => {
  const { data, error } = await supabase.from("recipes").insert({
    title,
    description: desc,
    recipe_type: recipeType,
    meal_portions: mealPortions,
    photo_link: photoLink,
    kcal_per_portion: kcalPerPortion,
    isvegan: isVegan,
    isvegetarian: isVegetarian,
    proposal_user_id: proposalUserId
  });
  const recipeId = data ? (data[0].recipe_id as string) : "";
  if (recipeId && recipeProducts.length > 0) {
    recipeProducts.forEach(ingredient => {
      insertRecipeIngredient({
        product_id: ingredient.product.value,
        recipe_id: recipeId,
        product_count: ingredient.count,
        measure: ingredient.measureType
      });
    });
  }
  if (error) {
    throw error;
  }
  return data;
};
