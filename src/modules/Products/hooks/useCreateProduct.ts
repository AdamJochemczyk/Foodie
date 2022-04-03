import { insertProduct } from "./insertProduct";
import { useUserId } from "src/utils/useUser";
import { getImageUrl } from "src/utils/getImageUrl";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { uploadImage } from "src/utils/uploadImage";
import { useRouter } from "next/router";
import { ProductProperties } from "../types";

const insertProductWithPhoto = async ({
  gtincode,
  name,
  category,
  userid,
  photolink
}: {
  gtincode: string;
  name: string;
  category: string;
  userid: string;
  photolink?: string;
}) => {
  if (photolink) {
    const { error, data } = await insertProduct({
      gtincode,
      name,
      photolink,
      category,
      proposaluserid: userid
    });
    if (error) {
      throw new Error("Error on product upload");
    }
    return data;
  } else {
    throw new Error("Error on image upload");
  }
};

export const useCreateProduct = () => {
  const { userId } = useUserId();
  const router = useRouter();

  return useMutation(
    async (values: ProductProperties) => {
      if (!values.photo) {
        throw new Error("Photo not provided");
      } else {
        const isImageAdded = await uploadImage(
          `products/${values.gtincode}`,
          values.photo
        );
        if (isImageAdded) {
          const photolink = await getImageUrl(`products/${values.gtincode}`);
          return await insertProductWithPhoto({
            ...values,
            userid: typeof userId === "string" ? userId : "",
            photolink
          });
        }
      }
    },
    {
      onSuccess: () => {
        toast.success("You added product for verification");
        router.push("/products");
      },
      onError: (error: { message: string }) => {
        toast.error(error.message);
      }
    }
  );
};
