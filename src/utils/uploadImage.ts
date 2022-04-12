import { getImageUrl } from "./getImageUrl";
import { supabase } from "./supabaseClient";
export const uploadImage = async (image_path: string, file: File) => {
  //TODO: check update in edit, {upsert: true}
  const { data, error } = await supabase.storage
    .from("images")
    .upload(image_path, file);
  if (error) {
    throw new Error("Error on file upload");
  }
  if (data) {
    const link = await getImageUrl(image_path);
    return { data, link };
  }
};
