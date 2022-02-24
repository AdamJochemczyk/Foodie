import { insertProduct } from "./insertProduct";
import { useUserId } from "./../../../utils/useUser";
import { getImageUrl } from "./../../../utils/getImageUrl";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { uploadImage } from "../../../utils/uploadImage";
import { useRouter } from "next/router";

interface CreateProductProperties {
  category: string;
  name: string;
  gtin_code: string;
  photo: File;
}

export const useCreateProduct = () => {
  const { userId } = useUserId();
  const router = useRouter();

  return useMutation(
    async ({ gtin_code, photo, name, category }: CreateProductProperties) => {
      const { data, error: uploadError } = await uploadImage(
        `products/${gtin_code}`,
        photo
      );
      if (uploadError) {
        throw new Error("Error on upload");
      } else if (data) {
        const photo_link = await getImageUrl(`products/${gtin_code}`);
        if (photo_link) {
          return await insertProduct({
            gtin_code,
            name,
            photo_link,
            category,
            proposal_user_id: typeof userId === "string" ? userId : ""
          });
        } else {
          throw new Error("Error on image upload");
        }
      }
    },
    {
      onSuccess: () => {
        toast.success("Dodales produkt do weryfikacji");
        router.push("/products");
      },
      onError: (error: { message: string }) => {
        toast.error(error.message);
      }
    }
  );
};
