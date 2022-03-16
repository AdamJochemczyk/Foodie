import { supabase } from "src/utils/supabaseClient";
import { useUserId } from "src/utils/useUser";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "react-query";

export const useRemoveFavRecipe = () => {
  const { userId } = useUserId();
  const queryClient = useQueryClient();

  return useMutation(
    async (recipeId: string) => {
      const { data, error } = await supabase
        .from("fav_users_recipes")
        .delete()
        .eq("user_id", userId || "")
        .eq("recipe_id", recipeId);
      if (error) {
        throw error;
      }
      return data;
    },
    {
      onSuccess: () => {
        toast.success("Usunąłeś przepis z ulubionych");
        queryClient.invalidateQueries("getRecipes");
      },
      onError: () => {
        toast.error("Coś poszło nie tak");
      }
    }
  );
};
