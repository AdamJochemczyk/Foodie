import { supabase } from "src/utils/supabaseClient";
import { useUserId } from "src/utils/useUser";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { useQueryClientConfig } from "src/utils/react-query-client";

export const useRemoveFavRecipe = () => {
  const { userId } = useUserId();
  const { queryClient } = useQueryClientConfig();

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
