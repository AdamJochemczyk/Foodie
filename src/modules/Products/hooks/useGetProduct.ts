import { definitions } from "./../../../../types/supabase";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import { supabase } from "src/utils/supabaseClient";

const getProduct = async (productId: string) => {
  const { data, error } = await supabase
    .from<definitions["products"]>("products")
    .select(`*,user:proposaluserid!inner(name,surname)`)
    .eq("productid", productId)
    .single();
  if (error) {
    throw error.message;
  }
  return data;
};

export const useGetProduct = (productId: string | string[] | undefined) => {
  const { error, data, isLoading } = useQuery(["getProduct", productId], () => {
    if (typeof productId === "string") {
      return getProduct(productId);
    }
  });
  if (error) {
    toast.error(error as string);
  }
  return {
    product: data,
    isLoading
  };
};
