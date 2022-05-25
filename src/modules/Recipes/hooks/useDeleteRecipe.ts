import { toast } from "react-toastify";
import { removeImage } from "src/utils/removeImage";
import { supabase } from "src/utils/supabaseClient";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import { useRemoveIngredients } from "./useRemoveIngredients";
import { DeleteRecipe } from "../types";

export const useDeleteRecipe = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const removeIngredients = useRemoveIngredients();

  return useMutation(
    async ({ id, title, ingredients }: DeleteRecipe) => {
      const ingredientIds = ingredients.map(({ id }) => id);
      try {
        await removeIngredients.mutate(ingredientIds);
      } catch (error) {
        toast.error("Cannot remove ingredients");
      }
      const { data, error } = await supabase
        .from("recipes")
        .delete()
        .eq("recipeid", id);
      await removeImage(`recipes/${title}`);
      if (error) {
        throw new Error("Cant delete recipe");
      }
      return data;
    },
    {
      onSuccess: () => {
        toast.success("You have removed recipe");
        router.push("/recipes/edit");
        queryClient.invalidateQueries("getRecipes");
      },
      onError: () => {
        toast.error("Something went wrong");
      }
    }
  );
};
