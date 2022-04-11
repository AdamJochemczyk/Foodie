import { supabase } from "src/utils/supabaseClient";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

export const useRemoveIngredient = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (ingredientId: string) => {
      const { data, error } = await supabase
        .from("ingredients")
        .delete()
        .eq("ingredientid", ingredientId);
      if (error) {
        throw error;
      }
      return data;
    },
    {
      onSuccess: () => {
        toast.success("You have removed ingredient from recipe");
        queryClient.invalidateQueries(["getIngredients", "getRecipe"]);
      },
      onError: () => {
        toast.error("Something went wrong");
      }
    }
  );
};
