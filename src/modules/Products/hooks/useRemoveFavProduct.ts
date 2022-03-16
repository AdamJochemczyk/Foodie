import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "react-query";
import { supabase } from "src/utils/supabaseClient";
import { useUserId } from "src/utils/useUser";

export const useRemoveFavProduct = () => {
  const { userId } = useUserId();
  const queryClient = useQueryClient();

  return useMutation(
    async (product_id: string) => {
      const { data, error } = await supabase
        .from("fav_users_products")
        .delete()
        .eq("user_id", userId || "")
        .eq("product_id", product_id);
      if (error) {
        throw error;
      }
      return data;
    },
    {
      onSuccess: () => {
        toast.success("Usunąłeś produkt z ulubionych");
        queryClient.invalidateQueries("getProducts");
      },
      onError: () => {
        toast.error("Coś poszło nie tak");
      }
    }
  );
};
