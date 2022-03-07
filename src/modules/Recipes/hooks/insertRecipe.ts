import { supabase } from "../../../utils/supabaseClient";

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
}

export const insertRecipe = async ({
  photoLink,
  title,
  desc,
  recipeType,
  mealPortions,
  kcalPerPortion,
  isVegan,
  isVegetarian
}: RecipeProperties) => {
  return await supabase.from("recipes").insert({
    title,
    description: desc,
    recipe_type: recipeType,
    meal_portions: mealPortions,
    photo_link: photoLink,
    kcal_per_portion: kcalPerPortion,
    is_vegan: isVegan,
    is_vegetarian: isVegetarian
  });
};
