import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { useUserId } from "src/utils/useUser";
import { uploadImage } from "src/utils/uploadImage";
import { getImageUrl } from "src/utils/getImageUrl";
import { insertRecipe } from "./insertRecipe";
import { CreateRecipeProperties } from "../types";

export const useCreateRecipe = () => {
  const { userId } = useUserId();
  const router = useRouter();
  return useMutation(
    async (values: CreateRecipeProperties) => {
      if (values.photo === null) {
        throw new Error("Zdjecie musi zostac podane");
      }
      const isImageAdded = await uploadImage(
        `recipes/${values.title}`,
        values.photo
      );
      if (isImageAdded) {
        const photoLink = await getImageUrl(`recipes/${values.title}`);
        if (photoLink) {
          return await insertRecipe({
            photoLink,
            ...values,
            proposalUserId: typeof userId === "string" ? userId : ""
          });
        } else {
          throw new Error("Error on image upload");
        }
      }
    },
    {
      onSuccess: () => {
        toast.success("Dodales przepis do weryfikacji");
        router.push("/recipes");
      },
      onError: (error: { message: string }) => {
        toast.error(error.message);
      }
    }
  );
};
