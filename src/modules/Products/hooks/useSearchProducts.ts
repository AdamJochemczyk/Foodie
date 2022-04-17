import { definitions } from "./../../../../types/supabase";
import { useUser } from "src/utils/useUser";
import { toast } from "react-toastify";
import { supabase } from "src/utils/supabaseClient";
import { useQuery } from "react-query";
import { FetchProducts, SearchProducts } from "../types";

const fetchProducts = async ({
  searchName,
  category,
  favorites,
  verified,
  userId
}: FetchProducts) => {
  const base = "productid,name,category,photolink,verified,";
  const isQueryForUser = verified
    ? `${base}isFav:favusersproducts${
        // eslint-disable-next-line sonarjs/no-nested-template-literals
        favorites ? `!inner(userid)` : `(userid)`
      }`
    : `${base}proposaluserid`;

  const query = supabase
    .from<definitions["products"]>("products")
    .select(isQueryForUser);

  if (verified) {
    query.eq("verified", verified);
    //@ts-ignore
    query.filter("favusersproducts.userid", "eq", userId);
  }

  if (searchName) {
    query.ilike("name", `%${searchName}%`);
  }
  if (category) {
    query.match({ category: category });
  }
  const { data: products, error } = await query;

  if (error) {
    throw error.message;
  }
  return favorites
    ? //@ts-ignore problem with supabase types
      products.filter(product => product.isFav.length > 0) || []
    : products;
};

export const useSearchProducts = (queryParams: SearchProducts) => {
  const { userId } = useUser();
  const { error, data, isLoading } = useQuery(
    ["getProducts", queryParams],
    () => fetchProducts({ ...queryParams, userId: userId || "" })
  );

  if (error) {
    toast.error(error as string);
  }

  return {
    entities: data || [],
    isLoading
  };
};
