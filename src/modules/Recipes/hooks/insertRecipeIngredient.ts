import { supabase } from "src/utils/supabaseClient";
import { toast } from "react-toastify";
import { RecipeIngredient } from "../types";

export const insertRecipeIngredient = async (values: RecipeIngredient) => {
  const { data, error } = await supabase.from("ingredients").insert(values);
  if (error) {
    throw error;
  }
  if (data) {
    toast.success("Dodałeś składnik do przepisu");
  }
  return data;
};
