import { toast } from "react-toastify";
import { removeImage } from "src/utils/removeImage";
import { supabase } from "src/utils/supabaseClient";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import { useRemoveIngredient } from "./useRemoveIngredient";
import { DeleteRecipe } from "../types";

export const useDeleteRecipe = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const removeIngredient = useRemoveIngredient();

  return useMutation(
    async ({ id, title, ingredients }: DeleteRecipe) => {
      const promises = ingredients.map(({ id }) => removeIngredient.mutate(id));
      await Promise.all(promises).catch(() =>
        toast.error("Nie można usunąć składników")
      );
      const { data, error } = await supabase
        .from("recipes")
        .delete()
        .eq("recipe_id", id);
      await removeImage(`recipes/${title}`);
      if (error) {
        throw new Error("Cant delete recipe");
      }
      return data;
    },
    {
      onSuccess: () => {
        toast.success("Usunales przepis");
        router.push("/recipes/verify");
        queryClient.invalidateQueries("getRecipes");
      },
      onError: () => {
        toast.error("Something went wrong");
      }
    }
  );
};
