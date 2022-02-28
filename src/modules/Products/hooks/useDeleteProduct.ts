import { supabase } from "./../../../utils/supabaseClient";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { removeImage } from "../../../utils/removeImage";

export const useDeleteProduct = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id, gtin_code }: { id: string; gtin_code: string }) => {
      const { data, error } = await supabase
        .from("products")
        .delete()
        .eq("product_id", id);

      const { error: imageError } = await removeImage(`products/${gtin_code}`);
      if (error || imageError) {
        throw error || imageError;
      }
      return data;
    },
    {
      onSuccess: () => {
        toast.success("Usunałes produkt");
        router.push("/products/verify");
        queryClient.invalidateQueries("getProducts");
      },
      onError: (error: { message: string }) => {
        toast.error(error.message);
      }
    }
  );
};
