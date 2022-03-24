import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { supabase } from "src/utils/supabaseClient";
import { useUserId } from "src/utils/useUser";
import { useQueryClientConfig } from "src/utils/react-query-client";

export const useRemoveFavProduct = () => {
  const { userId } = useUserId();
  const { queryClient } = useQueryClientConfig();

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
        toast.success("Usunąłeś produkt z ulubionych");
        queryClient.invalidateQueries("getProducts");
      },
      onError: () => {
        toast.error("Coś poszło nie tak");
      }
    }
  );
};
