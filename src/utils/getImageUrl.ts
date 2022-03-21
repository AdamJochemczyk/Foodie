import { supabase } from "./supabaseClient";

export const getImageUrl = async (imagePath: string) => {
  const { data } = await supabase.storage
    .from("foodie")
    .getPublicUrl(imagePath);
  return data?.publicURL;
};
