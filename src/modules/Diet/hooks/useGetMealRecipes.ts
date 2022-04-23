import { supabase } from "src/utils/supabaseClient";

interface MealRecipe {
  mealid: string;
  recipeid: string;
  iseaten: boolean;
  recipes: {
    title: string;
  };
}

export const getMealRecipes = async (mealId: string) => {
  const { data, error } = await supabase
    .from<MealRecipe>("recipeinmeal")
    .select("mealid,recipeid,iseaten,recipes:recipeid!inner(title)")
    .eq("mealid", mealId);
  if (error) {
    throw error.message;
  }
  return (
    data?.map(recipe => ({
      id: recipe.recipeid,
      name: recipe.recipes.title,
      type: "recipe"
    })) || []
  );
};
