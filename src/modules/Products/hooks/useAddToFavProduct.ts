import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "react-query";
import { supabase } from "src/utils/supabaseClient";
import { useUser } from "src/utils/useUser";

export const useAddToFavProduct = () => {
  const { userId } = useUser();
  const queryClient = useQueryClient();

  return useMutation(
    async (productid: string) => {
      const { data, error } = await supabase.from("favusersproducts").insert({
        userid: userId,
        productid
      });
      if (error) {
        throw error;
      }
      return data;
    },
    {
      onSuccess: () => {
        toast.success("You have added this product to favorites");
        queryClient.invalidateQueries("getProducts");
      },
      onError: () => {
        toast.error("Something went wrong");
      }
    }
  );
};
