import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "react-query";
import { supabase } from "src/utils/supabaseClient";
import { useUser } from "src/utils/useUser";

export const useRemoveFavProduct = () => {
  const { userId } = useUser();
  const queryClient = useQueryClient();

  return useMutation(
    async (productId: string) => {
      const { data, error } = await supabase
        .from("favusersproducts")
        .delete()
        .eq("userid", userId || "")
        .eq("productid", productId);
      if (error) {
        throw error;
      }
      return data;
    },
    {
      onSuccess: () => {
        toast.success("You have removed a product from favorites");
        queryClient.invalidateQueries("getProducts");
      },
      onError: () => {
        toast.error("Something went wrong");
      }
    }
  );
};
