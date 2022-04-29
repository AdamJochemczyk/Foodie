import { definitions } from "types/supabase";
import { supabase } from "src/utils/supabaseClient";

export const getProductsFromFridge = async (userId: string) => {
  const { data, error } = await supabase
    .from<definitions["productinfridge"]>("productinfridge")
    .select("productid,count")
    .eq("userid", userId)
    .gt("bestbeforedate", new Date().toISOString().split("T")[0]);

  return {
    productsInFridge: data || [],
    error
  };
};
