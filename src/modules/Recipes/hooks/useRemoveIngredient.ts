import { supabase } from "./../../../utils/supabaseClient";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

export const useRemoveIngredient = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (ingredientId: string) => {
      const { data, error } = await supabase
        .from("ingredients")
        .delete()
        .eq("id", ingredientId);
      if (error) {
        throw error;
      }
      return data;
    },
    {
      onSuccess: () => {
        toast.success("Usunąłeś składnik z przepisu");
        queryClient.invalidateQueries(["getIngredients", "getRecipe"]);
      },
      onError: () => {
        toast.error("Coś poszło nie tak");
      }
    }
  );
};
