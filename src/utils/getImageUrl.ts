import { supabase } from "./supabaseClient";

export const getImageUrl = async (imagePath: string) => {
  const { data } = await supabase.storage
    .from("images")
    .getPublicUrl(imagePath);
  return data?.publicURL;
};
