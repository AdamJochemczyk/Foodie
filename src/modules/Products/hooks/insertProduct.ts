import { InsertProduct } from "./../types";
import { supabase } from "src/utils/supabaseClient";

export const insertProduct = async (values: InsertProduct) => {
  return await supabase.from("products").insert(values);
};
