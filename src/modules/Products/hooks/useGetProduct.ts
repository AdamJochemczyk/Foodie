import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { supabase } from "../../../utils/supabaseClient";

const getProduct = async (id: string) => {
  const { data, error } = await supabase
    .from("products")
    .select(
      `*,users (
        email
    )`
    )
    .eq("product_id", id);
  if (error) {
    throw error.message;
  }
  return data;
};

export const useGetProduct = () => {
  const router = useRouter();
  const { id } = router.query;

  const { error, data, isLoading } = useQuery(["getProduct", id], () => {
    if (typeof id === "string") {
      return getProduct(id);
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
