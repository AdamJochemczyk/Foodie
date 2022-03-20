import { insertProduct } from "./insertProduct";
import { useUserId } from "src/utils/useUser";
import { getImageUrl } from "src/utils/getImageUrl";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { uploadImage } from "src/utils/uploadImage";
import { useRouter } from "next/router";
import { ProductProperties } from "../types";

export const useCreateProduct = () => {
  const { userId } = useUserId();
  const router = useRouter();

  return useMutation(
    async ({ gtinCode, photo, name, category }: ProductProperties) => {
      if (!photo) {
        throw new Error("Photo not provided");
      } else {
        const isImageAdded = await uploadImage(
          `products/${gtinCode}`,
          photo,
          false
        );
        if (isImageAdded) {
          const photoLink = await getImageUrl(`products/${gtinCode}`);
          if (photoLink) {
            return await insertProduct({
              gtinCode,
              name,
              photoLink,
              category,
              proposalUserId: typeof userId === "string" ? userId : ""
            });
          } else {
            throw new Error("Error on image upload");
          }
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
