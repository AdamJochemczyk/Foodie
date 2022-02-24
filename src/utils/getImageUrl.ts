import { supabase } from "./supabaseClient";

export const getImageUrl = async (image_path: string) => {
  const { data: imageData } = await supabase.storage
    .from("foodie")
    .getPublicUrl(image_path);
  return imageData?.publicURL;
};
