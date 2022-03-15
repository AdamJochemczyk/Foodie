import { toast } from "react-toastify";
import { supabase } from "./../../../utils/supabaseClient";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

const fetchRecipeIngredients = async (recipe_id: string) => {
  const { data, error } = await supabase
    .from("ingredients")
    .select(
      "recipe_id,product_id,product_count,measure,ingredient:product_id!inner(name)"
    )
    .eq("recipe_id", recipe_id);
  if (error) {
    throw error;
  }
  return data;
};

export const useFindIngredients = () => {
  const router = useRouter();
  const { recipe_id } = router.query;

  const { error, data, isLoading } = useQuery(
    ["getIngredients", recipe_id],
    () => {
      if (typeof recipe_id === "string") {
        return fetchRecipeIngredients(recipe_id);
      }
    }
  );
  if (error) {
    toast.error(error as string);
  }
  return { entities: data || [], isLoading };
};
