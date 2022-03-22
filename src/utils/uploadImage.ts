import { supabase } from "./supabaseClient";
export const uploadImage = async (image_path: string, file: File) => {
  //TODO: check update in edit, {upsert: true}
  const { data, error } = await supabase.storage
    .from("images")
    .upload(image_path, file);
  return { data, error };
};
