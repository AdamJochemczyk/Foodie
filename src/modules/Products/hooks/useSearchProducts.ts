import { definitions } from "./../../../../types/supabase";
import { useUserId } from "src/utils/useUser";
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
  const base = `productid,productname,category,photolink,verified,`;
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
  }

  if (searchName) {
    query.ilike("productname", `%${searchName}%`);
  }
  if (category) {
    query.match({ category: category });
  }
  if (favorites) {
    //@ts-ignore
    query.filter("favusersproducts.userid", "eq", userId);
  }
  const { data: products, error } = await query;

  if (error) {
    throw error.message;
  }
  return products;
};

export const useSearchProducts = (queryParams: SearchProducts) => {
  const { userId } = useUserId();
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
