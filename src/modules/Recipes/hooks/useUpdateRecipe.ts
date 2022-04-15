import { updateImage } from "src/utils/uploadImage";
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
    const image = await updateImage(`recipes/${values.imgCode}`, values.photo);
    if (image?.link) {
      return await updateRecipe({ ...values, photolink: image?.link });
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
        toast.success("Updated recipe");
        router.push("/recipes/edit");
      },
      onError: () => {
        toast.error("Something went wrong");
      }
    }
  );
};
