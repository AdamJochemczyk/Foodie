import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "react-query";
import { supabase } from "src/utils/supabaseClient";
import { useRouter } from "next/router";

export const useRemoveIngredientFromMeal = () => {
  const router = useRouter();
  const { meal_id } = router.query;
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id, type }: { id: string; type: string }) => {
      const { data, error } = await supabase
        .from(`${type}inmeal`)
        .delete()
        .eq(`${type}id`, id)
        .eq("mealid", meal_id);
      if (error) {
        throw error;
      }
      return data;
    },
    {
      onSuccess: () => {
        toast.success(`You removed it from meal`);
        queryClient.invalidateQueries(["getMealIngredients", meal_id]);
      },
      onError: () => {
        toast.error(`Cannot remove`);
      }
    }
  );
};
