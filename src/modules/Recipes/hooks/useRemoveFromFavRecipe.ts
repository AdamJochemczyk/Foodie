import { supabase } from "src/utils/supabaseClient";
import { useUser } from "src/utils/useUser";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "react-query";

export const useRemoveFavRecipe = () => {
  const { userId } = useUser();
  const queryClient = useQueryClient();

  return useMutation(
    async (recipeId: string) => {
      const { data, error } = await supabase
        .from("favusersrecipes")
        .delete()
        .eq("userid", userId || "")
        .eq("recipeid", recipeId);
      if (error) {
        throw error;
      }
      return data;
    },
    {
      onSuccess: () => {
        toast.success("You have removed recipe from favorites");
        queryClient.invalidateQueries("getRecipes");
      },
      onError: () => {
        toast.error("Something went wrong");
      }
    }
  );
};
