import { insertProduct } from "./insertProduct";
import { useUser } from "src/utils/useUser";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { uploadImage } from "src/utils/uploadImage";
import { useRouter } from "next/router";
import { ProductProperties } from "../types";
import { v4 as uuidv4 } from "uuid";

const insertProductWithPhoto = async ({
  gtincode,
  name,
  category,
  userid,
  photolink,
  uuid
}: {
  gtincode: string;
  name: string;
  category: string;
  userid: string;
  photolink?: string;
  uuid: string;
}) => {
  if (photolink) {
    const { error, data } = await insertProduct({
      gtincode,
      name,
      photolink,
      category,
      proposaluserid: userid,
      imgCode: uuid
    });
    if (error) {
      throw new Error(
        error.details.includes("gtincode")
          ? "Gtin code already exists"
          : "Error on product upload"
      );
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
        const uuidCode = uuidv4();
        const image = await uploadImage(`products/${uuidCode}`, values.photo);
        return await insertProductWithPhoto({
          ...values,
          userid: userId,
          photolink: image?.link,
          uuid: uuidCode
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
