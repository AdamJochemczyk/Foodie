import { UpdateProduct } from "./../types";
import { supabase } from "src/utils/supabaseClient";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { removeImage } from "src/utils/removeImage";
import { useQueryClientConfig } from "src/utils/react-query-client";

export const useDeleteProduct = () => {
  const router = useRouter();
  const { queryClient } = useQueryClientConfig();

  return useMutation(
    async ({
      productid,
      gtincode
    }: Pick<UpdateProduct, "productid" | "gtincode">) => {
      const { data, error } = await supabase
        .from("products")
        .delete()
        .eq("productid", productid);

      await removeImage(`products/${gtincode}`);

      if (error) {
        throw error;
      }
      return data;
    },
    {
      onSuccess: () => {
        toast.success("You have removed the product");
        router.push("/products/edit");
        queryClient.invalidateQueries("getProducts");
      },
      onError: (error: { message: string }) => {
        toast.error(error.message);
      }
    }
  );
};
