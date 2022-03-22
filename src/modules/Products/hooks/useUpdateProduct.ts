import { UpdateProduct, ProductProperties } from "./../types";
import { toast } from "react-toastify";
import { supabase } from "src/utils/supabaseClient";
import { useMutation, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import { uploadImage } from "src/utils/uploadImage";
import { getImageUrl } from "src/utils/getImageUrl";

const updateProduct = async ({
  name,
  category,
  gtincode,
  productid,
  photolink
}: UpdateProduct) => {
  const { data, error } = await supabase
    .from("products")
    .update(
      photolink
        ? {
            name,
            category,
            gtincode,
            photolink,
            verified: true
          }
        : {
            name,
            category,
            gtincode,
            verified: true
          }
    )
    .eq("productid", productid);
  if (error) {
    throw error;
  }
  return data;
};

const updatePhotoAndProduct = async (values: UpdateProduct) => {
  if (values.photo) {
    const { data: isFileAdded } = await uploadImage(
      `products/${values.gtincode}`,
      values?.photo
    );
    if (isFileAdded) {
      const photolink = await getImageUrl(`products/${values.gtincode}`);
      if (photolink) {
        return await updateProduct({
          ...values,
          photolink
        });
      }
    } else {
      throw new Error("Error on image upload");
    }
  }
};

export const useUpdateProduct = () => {
  const router = useRouter();
  const { product_id } = router.query;
  const queryClient = useQueryClient();

  return useMutation(
    async (values: ProductProperties) => {
      if (typeof product_id === "string") {
        if (!values.photo) {
          return updateProduct({ ...values, productid: product_id });
        } else {
          updatePhotoAndProduct({ ...values, productid: product_id });
        }
      }
    },
    {
      onSuccess: () => {
        toast.success("Zaktualizowałeś produkt");
        queryClient.invalidateQueries("getProducts");
        router.push("/products/edit");
      },
      onError: () => {
        toast.error("Something went wrong");
      }
    }
  );
};
