import { toast } from "react-toastify";
import { supabase } from "src/utils/supabaseClient";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

const fetchRecipeIngredients = async (recipeId: string) => {
  const { data, error } = await supabase
    .from("ingredients")
    .select(
      "id,recipeid,productid,productcount,measure,ingredient:productid!inner(name)"
    )
    .eq("recipeid", recipeId);
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
  return {
    ingredients:
      data?.map(el => ({
        id: el.id,
        name: el.ingredient.name,
        measure: el.measure,
        count: el.product_count
      })) || [],
    isLoading
  };
};
