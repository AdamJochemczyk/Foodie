import { useQuery } from "react-query";
import { supabase } from "src/utils/supabaseClient";

const getProduct = async (name: string) => {
  const { data, error } = await supabase
    .from("products")
    .select("product_id,name")
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
      data?.map(({ product_id, name }) => {
        return { value: product_id, label: name };
      }) || [],
    isLoading
  };
};
