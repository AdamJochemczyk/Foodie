import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { supabase } from "src/utils/supabaseClient";
import { useUserId } from "src/utils/useUser";
import { useQueryClientConfig } from "src/utils/react-query-client";

export const useAddToFavProduct = () => {
  const { userId } = useUserId();
  const { queryClient } = useQueryClientConfig();

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
        toast.success("Dodałeś produkt do ulubionych");
        queryClient.invalidateQueries("getProducts");
      },
      onError: () => {
        toast.error("Coś poszło nie tak");
      }
    }
  );
};
