import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { supabase } from "./../../../utils/supabaseClient";
import { useQueryClient } from "react-query";
import { useUserId } from "./../../../utils/useUser";

export const useAddToFavRecipe = () => {
  const { userId } = useUserId();
  const queryClient = useQueryClient();

  return useMutation(
    async (recipe_id: string) => {
      const { data, error } = await supabase.from("fav_users_recipes").insert({
        user_id: userId,
        recipe_id
      });
      if (error) {
        throw error;
      }
      return data;
    },
    {
      onSuccess: () => {
        toast.success("Dodałeś przepis do ulubionych");
        queryClient.invalidateQueries("getRecipes");
      },
      onError: () => {
        toast.error("Coś poszło nie tak");
      }
    }
  );
};
