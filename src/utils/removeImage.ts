import { supabase } from "./supabaseClient";
export const removeImage = async (imagePath: string) => {
  const { data, error } = await supabase.storage
    .from("images")
    .remove([imagePath]);
  if (error) {
    throw new Error("Error on delete image");
  }
  return data;
};
