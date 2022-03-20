import { InsertProduct } from "./../types";
import { supabase } from "src/utils/supabaseClient";

export const insertProduct = async ({
  gtinCode,
  name,
  photoLink,
  category,
  proposalUserId
}: InsertProduct) => {
  return await supabase.from("products").insert({
    gtinCode,
    name,
    photoLink,
    category,
    proposalUserId
  });
};
