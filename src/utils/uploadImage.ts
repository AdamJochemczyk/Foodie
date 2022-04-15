import { getImageUrl } from "./getImageUrl";
import { supabase } from "./supabaseClient";
export const uploadImage = async (image_path: string, file: File) => {
  const { data, error } = await supabase.storage
    .from("images")
    .upload(image_path, file);
  if (error) {
    throw new Error(error.message);
  }
  if (data) {
    const link = await getImageUrl(image_path);
    return { data, link };
  }
};

export const updateImage = async (image_path: string, file: File) => {
  const { data, error } = await supabase.storage
    .from("images")
    .update(image_path, file, {
      cacheControl: "3600",
      upsert: true
    });
  if (error) {
    throw new Error(error.message);
  }
  if (data) {
    const link = await getImageUrl(image_path);
    return { data, link };
  }
};
