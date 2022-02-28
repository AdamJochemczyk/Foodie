import { supabase } from "./supabaseClient";
export const removeImage = async (image_path: string) => {
  const { data, error } = await supabase.storage
    .from("foodie")
    .remove([image_path]);
  return { data, error };
};
