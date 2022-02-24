import { supabase } from "./../../../utils/supabaseClient";

export const insertProduct = async ({
  gtin_code,
  name,
  photo_link,
  category,
  proposal_user_id
}: {
  gtin_code: string;
  name: string;
  photo_link: string;
  category: string;
  proposal_user_id: string;
}) => {
  return await supabase.from("products").insert({
    gtin_code,
    name,
    photo_link,
    category,
    proposal_user_id
  });
};
