import { supabase } from "./supabaseClient";
export const uploadImage = async (
  image_path: string,
  file: File,
  upsert = true
) => {
  const { data, error } = await supabase.storage
    .from("foodie")
    .upload(image_path, file, {
      upsert
    });
  return { data, error };
};
