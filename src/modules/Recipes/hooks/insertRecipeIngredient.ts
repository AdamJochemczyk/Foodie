import { supabase } from "src/utils/supabaseClient";
import { toast } from "react-toastify";
interface RecipeIngredient {
  product_id: string;
  recipe_id: string;
  product_count: number;
  measure: string;
}

export const insertRecipeIngredient = async ({
  product_id,
  recipe_id,
  product_count,
  measure
}: RecipeIngredient) => {
  const { data, error } = await supabase.from("ingredients").insert({
    product_id,
    recipe_id,
    product_count,
    measure
  });
  if (error) {
    throw error;
  }
  if (data) {
    toast.success("Dodałeś składnik do przepisu");
  }
  return data;
};
