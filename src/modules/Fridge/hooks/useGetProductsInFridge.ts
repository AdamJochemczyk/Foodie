import { toast } from "react-toastify";
import { supabase } from "src/utils/supabaseClient";
import { useQuery } from "react-query";
import { useUser } from "src/utils/useUser";

const getProductsInFridge = async (userId: string) => {
  const { data, error } = await supabase
    .from("productinfridge")
    .select("id,count,bestbeforedate,products(name,photolink)")
    .eq("userid", userId)
    .order("bestbeforedate", { ascending: true });
  if (error) {
    toast.error("Cannot get products from fridge");
  }
  return (
    data?.map(({ bestbeforedate, count, id, products }) => ({
      bestbeforedate,
      count,
      id,
      name: products.name,
      photolink: products.photolink
    })) || []
  );
};

export const useGetProductsInFridge = () => {
  const { userId } = useUser();
  const { data, isLoading } = useQuery(["productsInFridge", userId], () =>
    getProductsInFridge(userId)
  );

  return {
    entities: data || [],
    isLoading: isLoading
  };
};
