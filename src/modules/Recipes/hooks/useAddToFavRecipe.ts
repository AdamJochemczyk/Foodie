import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "react-query";
import { supabase } from "src/utils/supabaseClient";
import { useUser } from "src/utils/useUser";

export const useAddToFavRecipe = () => {
  const { userId } = useUser();
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
        toast.success("You have added recipe to favorites");
        queryClient.invalidateQueries("getRecipes");
      },
      onError: () => {
        toast.error("Something went wrong");
      }
    }
  );
};
