import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { useUser } from "src/utils/useUser";
import { uploadImage } from "src/utils/uploadImage";
import { insertRecipe } from "./insertRecipe";
import { CreateRecipeProperties } from "../types";

export const useCreateRecipe = () => {
  const { userId } = useUser();
  const router = useRouter();
  return useMutation(
    async (values: CreateRecipeProperties) => {
      if (values.photo === null) {
        throw new Error("Please provide the photo");
      }
      const uuidCode = uuidv4();
      const image = await uploadImage(`recipes/${uuidCode}`, values.photo);
      if (image?.link) {
        return await insertRecipe({
          ...values,
          photolink: image?.link,
          proposaluserid: userId,
          uuid: uuidCode
        });
      } else {
        throw new Error("Error on image upload");
      }
    },
    {
      onSuccess: () => {
        toast.success("You have added recipe to verification");
        router.push("/recipes");
      },
      onError: (error: { message: string }) => {
        toast.error(error.message);
      }
    }
  );
};
