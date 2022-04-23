import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "react-query";
import { supabase } from "src/utils/supabaseClient";

export const useAddIngredientToMeal = ({ mealId }: { mealId: string }) => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id, type }: { id: string; type: "product" | "recipe" }) => {
      const { data, error } = await supabase
        .from(`${type}inmeal`)
        .insert(
          type === "product"
            ? { mealid: mealId, productid: id }
            : { mealid: mealId, recipeid: id }
        );
      if (error) {
        throw error;
      }
      return data;
    },
    {
      onSuccess: () => {
        toast.success(`You added it to meal`);
        queryClient.invalidateQueries(["getMealIngredients", mealId]);
      },
      onError: () => {
        toast.error(`Cannot add it to meal`);
      }
    }
  );
};
