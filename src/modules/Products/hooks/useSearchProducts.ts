import { useUserId } from "./../../../utils/useUser";
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
  favorites: boolean,
  verified: boolean,
  userId: string
) => {
  const isQueryForUser = verified
    ? `product_id,name,category,photo_link,isFav:fav_users_products${
        // eslint-disable-next-line sonarjs/no-nested-template-literals
        favorites ? `!inner(user_id)` : `(user_id)`
      }`
    : `product_id,name,category,photo_link,proposal_user_id`;

  const query = supabase
    .from("products")
    .select(isQueryForUser)
    .eq("verified", verified);

  if (searchName) {
    query.ilike("name", `%${searchName}%`);
  }
  if (category) {
    query.match({ category: category });
  }
  if (favorites) {
    query.filter("fav_users_products.user_id", "eq", userId);
  }
  const { data: products, error } = await query;

  if (error) {
    throw error.message;
  }
  return products;
};

export const useSearchProducts = (
  queryParams: SearchProducts,
  verified: boolean
) => {
  const { userId } = useUserId();
  const { error, data, isLoading, refetch } = useQuery(
    ["getProducts", queryParams],
    () =>
      fetchProducts(
        queryParams.searchName,
        queryParams.category,
        queryParams.favorites,
        verified,
        userId || ""
      )
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
