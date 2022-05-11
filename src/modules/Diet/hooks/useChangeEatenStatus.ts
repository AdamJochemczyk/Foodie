import { toast } from "react-toastify";
import { supabase } from "../../../utils/supabaseClient";
import { useMutation, useQueryClient } from "react-query";

const changeMarkOfMeal = async ({
  mealid,
  id,
  type,
  iseaten
}: {
  mealid: string;
  id: string;
  type: "product" | "recipe";
  iseaten: boolean;
}) => {
  const { data, error } = await supabase
    .from(`${type}inmeal`)
    .update({ iseaten })
    .match(
      type === "product" ? { mealid, productid: id } : { mealid, recipeid: id }
    );
  if (error) {
    throw error;
  }
  return data;
};
export const useChangeEatenStatus = ({ mealId }: { mealId: string }) => {
  const queryClient = useQueryClient();

  return useMutation(
    ["markAsEaten", mealId],
    async ({
      id,
      type,
      marker
    }: {
      id: string;
      type: "product" | "recipe";
      marker: boolean;
    }) => {
      const data = await changeMarkOfMeal({
        mealid: mealId,
        id,
        type,
        iseaten: marker
      });
      if (data) {
        // if(type==="product"){
        //   //TODO: remove product form fridge
        // }else{
        //   //TODO: remove recipe ingredients from fridge
        // }
      }
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getMealIngredients");
      },
      onError: (error: Error) => {
        toast.error(error.message);
      }
    }
  );
};
