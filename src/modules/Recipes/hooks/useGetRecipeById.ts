import { supabase } from "./../../../utils/supabaseClient";

export const getRecipeById = async (id: string) => {
  return await supabase
    .from("recipes")
    .select(`*`)
    .eq("recipe_id", id)
    .single();
};
