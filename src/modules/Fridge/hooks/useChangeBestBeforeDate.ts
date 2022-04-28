import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "react-query";
import { supabase } from "src/utils/supabaseClient";

export const useChangeBestBeforeDate = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    "changeBestBeforeDate",
    async (newDate: string) => {
      const { data, error } = await supabase
        .from("productinfridge")
        .update({ bestbeforedate: newDate })
        .eq("id", id);
      if (error) {
        throw new Error("Cant change best before date");
      }
      return data;
    },
    {
      onSuccess: () => {
        toast.success("You successfully updated best before date");
        queryClient.invalidateQueries("productsInFridge");
      },
      onError: (error: Error) => {
        toast.error(error.message);
      }
    }
  );
};
