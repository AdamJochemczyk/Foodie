import { toast } from "react-toastify";
import { supabase } from "./../../../utils/supabaseClient";
import { useQuery } from "react-query";
export interface SearchProducts {
  searchName: string;
  category: string;
  favorites: boolean;
}

const fetchProducts = async (
  searchName: string,
  category: string,
  favorites: boolean
) => {
  const query = supabase
    .from("products")
    .select("category,name,photo_link,product_id")
    .eq("verified", true);
  if (searchName) {
    query.ilike("name", `%${searchName}%`);
  }
  if (category) {
    query.match({ category: category });
  }
  if (favorites) {
    //TODO: favorites wait for table on BE
    //TODO: implement it
  }
  const { data: products, error } = await query;

  if (error) {
    throw error.message;
  }
  return products;
};

export const useSearchProducts = ({
  searchName,
  category,
  favorites
}: SearchProducts) => {
  const { error, data, isLoading, refetch } = useQuery(
    ["getProducts", searchName, category, favorites],
    () => fetchProducts(searchName, category, favorites)
  );

  if (error) {
    toast.error(error as string);
  }

  return {
    entities: data || [],
    isLoading,
    refetch
  };
};
