import { definitions } from "types/supabase";
import { FetchRecipes, SearchRecipes } from "./../types";
import { useQuery } from "react-query";
import { useUserId } from "src/utils/useUser";
import { supabase } from "src/utils/supabaseClient";
import { toast } from "react-toastify";

const fetchRecipes = async ({
  title,
  recipeType,
  mealPortions,
  kcalPerPortionFrom,
  kcalPerPortionTo,
  isVegan,
  isVegetarian,
  isFavorites,
  verified,
  userId
}: FetchRecipes) => {
  const base =
    "recipeid,title,description,photolink,mealportions,kcalperportion,isvegan,isvegetarian,recipetype,";
  const isQueryForUser = verified
    ? `${base}isFav:favusersrecipes${
        // eslint-disable-next-line sonarjs/no-nested-template-literals
        isFavorites ? `!inner(userid)` : `(userid)`
      }`
    : `${base} proposaluserid`;

  const query = supabase
    .from<definitions["recipes"]>("recipes")
    .select(isQueryForUser);

  if (verified) {
    query.eq("verified", verified);
  }
  if (title) {
    query.ilike("title", `%${title}%`);
  }
  if (recipeType) {
    query.match({ recipetype: recipeType });
  }
  if (mealPortions) {
    query.eq("mealportions", mealPortions);
  }
  if (kcalPerPortionFrom && kcalPerPortionTo) {
    query.gt("kcalperportion", kcalPerPortionFrom);
    query.lt("kcalperportion", kcalPerPortionTo);
  }
  if (isVegan) {
    query.eq("isvegan", isVegan);
  }
  if (isVegetarian) {
    query.eq("isvegetarian", isVegetarian);
  }
  if (isFavorites) {
    //@ts-ignore
    query.filter("favusersrecipes.userid", "eq", userId);
  }
  const { data: recipes, error } = await query;
  if (error) {
    throw error.message;
  }
  return recipes;
};

export const useSearchRecipes = (queryParams: SearchRecipes) => {
  const { userId } = useUserId();
  const { error, data, isLoading } = useQuery(["getRecipes", queryParams], () =>
    fetchRecipes({ ...queryParams, userId: userId || "" })
  );

  if (error) {
    toast.error(error as string);
  }

  return {
    entities: data || [],
    isLoading
  };
};
