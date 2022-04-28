import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "react-query";
import { supabase } from "src/utils/supabaseClient";

export const useRemoveProductFromFridge = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    "removeProductFromFridge",
    async () => {
      const { data, error } = await supabase
        .from("productinfridge")
        .delete()
        .eq("id", id);
      if (error) {
        throw new Error("Cant remove product");
      }
      return data;
    },
    {
      onSuccess: () => {
        toast.success("You successfully removed product");
        queryClient.invalidateQueries("productsInFridge");
      },
      onError: (error: Error) => {
        toast.error(error.message);
      }
    }
  );
};
