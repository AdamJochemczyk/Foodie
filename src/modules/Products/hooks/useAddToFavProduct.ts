import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "react-query";
import { supabase } from "../../../utils/supabaseClient";
import { useUserId } from "../../../utils/useUser";

export const useAddToFavProduct = () => {
  const { userId } = useUserId();
  const queryClient = useQueryClient();

  return useMutation(
    async (product_id: string) => {
      const { data, error } = await supabase.from("fav_users_products").insert({
        user_id: userId,
        product_id
      });
      if (error) {
        throw error;
      }
      return data;
    },
    {
      onSuccess: () => {
        toast.success("Dodałeś produkt do ulubionych");
        queryClient.invalidateQueries("getProducts");
      },
      onError: () => {
        toast.error("Coś poszło nie tak");
      }
    }
  );
};
