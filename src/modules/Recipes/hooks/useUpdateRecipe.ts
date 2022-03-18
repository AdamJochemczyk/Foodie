import { getImageUrl } from "src/utils/getImageUrl";
import { uploadImage } from "src/utils/uploadImage";
import { supabase } from "src/utils/supabaseClient";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

interface UpdateRecipeProperties {
  title: string;
  description: string;
  recipeType: string;
  mealPortions: number;
  kcalPerPortion: number;
  isVegan: boolean;
  isVegetarian: boolean;
  photo: File | null;
}

export const useUpdateRecipe = () => {
  const router = useRouter();
  const { recipe_id } = router.query;
  return useMutation(
    async ({
      title,
      description,
      recipeType,
      mealPortions,
      kcalPerPortion,
      isVegan,
      isVegetarian,
      photo
    }: UpdateRecipeProperties) => {
      if (photo === null) {
        const { data, error } = await supabase
          .from("recipes")
          .update({
            title,
            description,
            recipe_type: recipeType,
            meal_portions: mealPortions,
            kcal_per_portion: kcalPerPortion,
            isvegan: isVegan,
            isvegetarian: isVegetarian,
            verified: true
          })
          .eq("recipe_id", recipe_id);
        if (error) {
          throw error;
        }
        return data;
      } else {
        const { data, error: uploadError } = await uploadImage(
          `recipes/${title}`,
          photo
        );
        if (uploadError) {
          throw new Error("Error on upload");
        } else if (data) {
          const photoLink = getImageUrl(`recipes/${title}`);
          if (photoLink) {
            const { data, error } = await supabase
              .from("recipes")
              .update({
                title,
                description,
                recipe_type: recipeType,
                meal_portions: mealPortions,
                kcal_per_portion: kcalPerPortion,
                isvegan: isVegan,
                isvegetarian: isVegetarian,
                verified: true,
                photo_link: photoLink
              })
              .eq("product_id", recipe_id);
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
        toast.success("Zweryfikowałeś przepis");
        router.push("/recipes/verify");
      },
      onError: () => {
        toast.error("Something went wrong");
      }
    }
  );
};
