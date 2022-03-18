import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { useUserId } from "src/utils/useUser";
import { uploadImage } from "src/utils/uploadImage";
import { getImageUrl } from "src/utils/getImageUrl";
import { insertRecipe } from "./insertRecipe";

export interface RecipeProducts {
  product: { value: string; label: string };
  measureType: string;
  count: number;
}
interface CreateRecipeProperties {
  title: string;
  description: string;
  recipeType: string;
  mealPortions: number;
  kcalPerPortion: number;
  isVegan: boolean;
  isVegetarian: boolean;
  photo: File | null;
  recipeProducts: RecipeProducts[];
}

export const useAddRecipe = () => {
  const { userId } = useUserId();
  const router = useRouter();
  return useMutation(
    async ({
      title,
      description,
      recipeType,
      mealPortions,
      kcalPerPortion,
      isVegan,
      isVegetarian,
      photo,
      recipeProducts
    }: CreateRecipeProperties) => {
      if (photo === null) {
        throw new Error("Zdjecie musi zostac podane");
      }
      const { data, error: uploadError } = await uploadImage(
        `recipes/${title}`,
        photo,
        false
      );
      if (uploadError) {
        throw new Error("Error on upload");
      } else if (data) {
        const photoLink = await getImageUrl(`recipes/${title}`);
        if (photoLink) {
          return await insertRecipe({
            photoLink,
            title,
            description,
            recipeType,
            mealPortions,
            kcalPerPortion,
            isVegan,
            isVegetarian,
            proposalUserId: typeof userId === "string" ? userId : "",
            recipeProducts
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
