import { UpdateProduct, ProductProperties } from "./../types";
import { toast } from "react-toastify";
import { supabase } from "src/utils/supabaseClient";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { uploadImage } from "src/utils/uploadImage";
import { getImageUrl } from "src/utils/getImageUrl";

const updateProduct = async (values: UpdateProduct) => {
  const { data, error } = await supabase
    .from("products")
    .update({
      ...values,
      verified: true
    })
    .eq("product_id", values.productId);
  if (error) {
    throw error;
  }
  return data;
};

const updatePhotoAndProduct = async (values: UpdateProduct) => {
  if (values.photo) {
    const isFileAdded = await uploadImage(
      `products/${values.gtinCode}`,
      values?.photo
    );
    if (isFileAdded) {
      const photoLink = await getImageUrl(`products/${values.gtinCode}`);
      if (photoLink) {
        return await updateProduct({
          ...values,
          photoLink
        });
      }
    } else {
      throw new Error("Error on image upload");
    }
  }
};

export const useUpdateProduct = () => {
  const router = useRouter();
  const { id } = router.query;

  return useMutation(
    async (values: ProductProperties) => {
      if (typeof id === "string") {
        if (values.photo === null) {
          return updateProduct({ ...values, productId: id });
        } else {
          updatePhotoAndProduct({ ...values, productId: id });
        }
      }
    },
    {
      onSuccess: () => {
        toast.success("Zweryfikowałeś produkt");
        router.push("/products/edit");
      },
      onError: () => {
        toast.error("Something went wrong");
      }
    }
  );
};
