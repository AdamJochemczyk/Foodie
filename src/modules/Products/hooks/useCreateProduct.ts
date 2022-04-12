import { insertProduct } from "./insertProduct";
import { useUser } from "src/utils/useUser";
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
  const { userId } = useUser();
  const router = useRouter();

  return useMutation(
    async (values: ProductProperties) => {
      if (!values.photo) {
        throw new Error("Photo not provided");
      } else {
        const image = await uploadImage(
          `products/${values.gtincode}`,
          values.photo
        );
        return await insertProductWithPhoto({
          ...values,
          userid: typeof userId === "string" ? userId : "",
          photolink: image?.link
        });
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
