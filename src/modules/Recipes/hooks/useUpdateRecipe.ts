import { getImageUrl } from "src/utils/getImageUrl";
import { uploadImage } from "src/utils/uploadImage";
import { supabase } from "src/utils/supabaseClient";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Recipe, UpdateRecipe } from "../types";

const updateRecipe = async (values: UpdateRecipe) => {
  const { data, error } = await supabase
    .from("recipes")
    .update({
      title: values.title,
      description: values.description,
      recipetype: values.recipetype,
      mealportions: values.mealportions,
      kcalperportion: values.kcalperportion,
      isvegan: values.isvegan,
      isvegetarian: values.isvegetarian,
      verified: true
    })
    .eq("recipeid", values.recipeid);
  if (error) {
    throw error;
  }
  return data;
};

const updatePhotoAndRecipe = async (values: UpdateRecipe) => {
  if (values.photo) {
    const isImageAdded = await uploadImage(
      `recipes/${values.title}`,
      values.photo
    );
    if (isImageAdded) {
      const photoLink = await getImageUrl(`recipes/${values.title}`);
      if (photoLink) {
        return await updateRecipe({ ...values, photolink: photoLink });
      }
    } else {
      throw new Error("Error on image upload");
    }
  }
};

export const useUpdateRecipe = () => {
  const router = useRouter();
  const { recipe_id } = router.query;
  return useMutation(
    async (values: Recipe) => {
      if (typeof recipe_id === "string") {
        if (values.photo === null) {
          return await updateRecipe({ ...values, recipeid: recipe_id });
        } else {
          return await updatePhotoAndRecipe({ ...values, recipeid: recipe_id });
        }
      }
    },
    {
      onSuccess: () => {
        toast.success("Zweryfikowałeś przepis");
        router.push("/recipes/edit");
      },
      onError: () => {
        toast.error("Something went wrong");
      }
    }
  );
};
