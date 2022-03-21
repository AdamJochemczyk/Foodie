import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { supabase } from "src/utils/supabaseClient";
import { useQueryClient } from "react-query";
import { useUserId } from "src/utils/useUser";

export const useAddToFavRecipe = () => {
  const { userId } = useUserId();
  const queryClient = useQueryClient();

  return useMutation(
    async (recipeid: string) => {
      const { data, error } = await supabase.from("favusersrecipes").insert({
        userid: userId,
        recipeid
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
