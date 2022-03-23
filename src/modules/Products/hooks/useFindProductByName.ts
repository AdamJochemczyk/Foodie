import { definitions } from "./../../../../types/supabase";
import { useQuery } from "react-query";
import { supabase } from "src/utils/supabaseClient";

const getProduct = async (name: string) => {
  const { data, error } = await supabase
    .from<definitions["products"]>("products")
    .select("productid,name")
    .ilike("name", `%${name}%`)
    .eq("verified", true)
    .limit(10);
  if (error) {
    throw error.message;
  }
  return data;
};

export const useFindProductByName = (name: string) => {
  const { data, isLoading } = useQuery(["getProductOptions", name], () => {
    return getProduct(name);
  });

  return {
    options:
      data?.map(({ productid, name }) => ({
        value: productid,
        label: name
      })) || [],
    isLoading
  };
};
