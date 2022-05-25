import { supabase } from "src/utils/supabaseClient";
import { toast } from "react-toastify";
import { RecipeIngredient } from "../types";

export const insertRecipeIngredient = async (values: RecipeIngredient[]) => {
  const { data, error } = await supabase.from("ingredients").insert(values);
  if (error) {
    throw error;
  }
  if (data) {
    toast.success(
      `You have added ingredient${values.length > 1 ? "s" : ""} to a recipe`
    );
  }
  return data;
};
