import { UpdateProduct } from "./../types";
import { supabase } from "src/utils/supabaseClient";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { removeImage } from "src/utils/removeImage";

export const useDeleteProduct = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation(
    async ({
      productId,
      gtinCode
    }: Pick<UpdateProduct, "productId" | "gtinCode">) => {
      const { data, error } = await supabase
        .from("products")
        .delete()
        .eq("productid", productId);

      await removeImage(`products/${gtinCode}`);

      if (error) {
        throw error;
      }
      return data;
    },
    {
      onSuccess: () => {
        toast.success("Usunałes produkt");
        router.push("/products/edit");
        queryClient.invalidateQueries("getProducts");
      },
      onError: (error: { message: string }) => {
        toast.error(error.message);
      }
    }
  );
};
