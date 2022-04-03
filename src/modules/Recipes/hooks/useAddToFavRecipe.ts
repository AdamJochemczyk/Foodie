import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { supabase } from "src/utils/supabaseClient";
import { useUserId } from "src/utils/useUser";
import { useQueryClientConfig } from "src/utils/react-query-client";

export const useAddToFavRecipe = () => {
  const { userId } = useUserId();
  const { queryClient } = useQueryClientConfig();

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
