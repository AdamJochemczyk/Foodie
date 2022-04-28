import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "react-query";
import { supabase } from "src/utils/supabaseClient";

export const useChangeCount = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    "changeCount",
    async (newCount: number) => {
      const { data, error } = await supabase
        .from("productinfridge")
        .update({ count: newCount })
        .eq("id", id);
      if (error) {
        throw new Error("Cant change count");
      }
      return data;
    },
    {
      onSuccess: () => {
        toast.success("You successfully updated count");
        queryClient.invalidateQueries("productsInFridge");
      },
      onError: (error: Error) => {
        toast.error(error.message);
      }
    }
  );
};
