import { supabase } from "./../../../utils/supabaseClient";
import { toast } from "react-toastify";
import { useQuery } from "react-query";

const findProductsToVerify = async () => {
  const { data: products, error } = await supabase
    .from("products")
    .select("category,name,photo_link,product_id")
    .eq("verified", false);
  if (error) {
    throw error.message;
  }
  return products;
};

export const useFindProductsToVerify = () => {
  const { error, data, isLoading } = useQuery(["getProductsToVerify"], () =>
    findProductsToVerify()
  );
  if (error) {
    toast.error(error as string);
  }
  return {
    entities: data || [],
    isLoading
  };
};
