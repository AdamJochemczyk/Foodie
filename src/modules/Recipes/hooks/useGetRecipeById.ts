import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { supabase } from "src/utils/supabaseClient";

export const getRecipeById = async (id: string) => {
  const { data, error } = await supabase
    .from("recipes")
    .select(`*,user:proposal_user_id!inner(email)`)
    .eq("recipe_id", id)
    .single();
  if (error) {
    throw error;
  }
  return data;
};

export const useGetRecipeById = () => {
  const router = useRouter();
  const { recipe_id } = router.query;
  const { error, data, isLoading } = useQuery(["getRecipe", recipe_id], () => {
    if (typeof recipe_id === "string") {
      return getRecipeById(recipe_id);
    }
  });
  if (error) {
    toast.error(error as string);
  }
  return {
    recipe: data || [],
    isLoading
  };
};
