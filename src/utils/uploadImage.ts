import { supabase } from "./supabaseClient";
export const uploadImage = async (image_path: string, file: File) => {
  const { data, error } = await supabase.storage
    .from("foodie")
    .upload(image_path, file, {
      upsert: true
    });
  return { data, error };
};
