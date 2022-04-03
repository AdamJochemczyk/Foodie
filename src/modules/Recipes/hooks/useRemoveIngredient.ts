import { supabase } from "src/utils/supabaseClient";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useQueryClientConfig } from "src/utils/react-query-client";

export const useRemoveIngredient = () => {
  const { queryClient } = useQueryClientConfig();
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
