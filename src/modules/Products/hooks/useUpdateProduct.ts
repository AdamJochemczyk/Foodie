import { toast } from "react-toastify";
import { supabase } from "src/utils/supabaseClient";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { uploadImage } from "src/utils/uploadImage";
import { getImageUrl } from "src/utils/getImageUrl";

interface UpdateProductProperties {
  category: string;
  name: string;
  gtin_code: string;
  photo: File | null;
}

export const useUpdateProduct = () => {
  const router = useRouter();
  const { id } = router.query;

  return useMutation(
    async ({ gtin_code, photo, name, category }: UpdateProductProperties) => {
      if (photo === null) {
        const { data, error } = await supabase
          .from("products")
          .update({
            gtin_code,
            name,
            category,
            verified: true
          })
          .eq("product_id", id);
        if (error) {
          throw error;
        }
        return data;
      } else {
        const { data, error: uploadError } = await uploadImage(
          `products/${gtin_code}`,
          photo
        );
        if (uploadError) {
          throw new Error("Error on upload");
        } else if (data) {
          const photo_link = await getImageUrl(`products/${gtin_code}`);
          if (photo_link) {
            const { data, error } = await supabase
              .from("products")
              .update({
                gtin_code,
                name,
                category,
                photo_link,
                verified: true
              })
              .eq("product_id", id);
            if (error) {
              throw error;
            }
            return data;
          }
        } else {
          throw new Error("Error on image upload");
        }
      }
    },
    {
      onSuccess: () => {
        toast.success("Zweryfikowałeś produkt");
        router.push("/products/verify");
      },
      onError: () => {
        toast.error("Something went wrong");
      }
    }
  );
};
