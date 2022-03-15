import { supabase } from "../../../utils/supabaseClient";
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

const insertRecipeIngredient = async (
  product_id: string,
  recipe_id: string,
  product_count: number,
  measure: string
) => {
  const { data, error } = await supabase.from("ingredients").insert({
    product_id,
    recipe_id,
    product_count,
    measure
  });
  if (error) {
    throw error;
  }
  return data;
};

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
  if (recipeId) {
    recipeProducts.forEach(ingredient => {
      insertRecipeIngredient(
        ingredient.product.value,
        recipeId,
        ingredient.count,
        ingredient.measureType
      );
    });
  }
  if (error) {
    throw error;
  }
  return data;
};
