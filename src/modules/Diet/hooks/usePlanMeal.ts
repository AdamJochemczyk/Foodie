import { toast } from "react-toastify";
import { useUserContext } from "src/context/UserContext";
import { supabase } from "src/utils/supabaseClient";
import { useMutation, useQueryClient } from "react-query";

export const usePlanMeal = () => {
  const { user } = useUserContext();
  const queryClient = useQueryClient();
  return useMutation(
    async ({ meal, day }: { meal: string; day: string }) => {
      const { error, data } = await supabase
        .from("usermeal")
        .insert({ userid: user.userId, mealdate: day, mealname: meal });
      if (error) {
        throw new Error("Cannot create meal");
      }
      return data;
    },
    {
      onSuccess: () => {
        toast.success("Created a slot to plan a meal");
        queryClient.invalidateQueries("getUserMeals");
      },
      onError: (error: Error) => {
        toast.error(error.message);
      }
    }
  );
};
