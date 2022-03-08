import { useQuery } from "react-query";
import { useUserId } from "./../../../utils/useUser";
import { supabase } from "../../../utils/supabaseClient";
import { toast } from "react-toastify";

interface QueryParams {
  title: string;
  recipeType: string;
  mealPortions: number;
  kcalPerPortionFrom: number;
  kcalPerPortionTo: number;
  isVegan: boolean;
  isFavorites: boolean;
  isVegetarian: boolean;
}
interface SearchQueryParams extends QueryParams {
  verified: boolean;
  userId: string;
}

const fetchRecipes = async ({
  title,
  recipeType,
  mealPortions,
  kcalPerPortionFrom,
  kcalPerPortionTo,
  isVegan,
  isVegetarian,
  isFavorites,
  verified
}: SearchQueryParams) => {
  //TODO: fav by inner join and userId from query params
  //TODO: can rafactor this
  /*
  isFav:fav_users_products${
        // eslint-disable-next-line sonarjs/no-nested-template-literals
        favorites ? `!inner(user_id)` : `(user_id)`
      }`
*/

  const isQueryForUser = verified
    ? `recipe_id,title,description,photo_link,meal_portions,kcal_per_portion,isvegan,isvegetarian,recipe_type`
    : `recipe_id,title,description,photo_link,meal_portions,kcal_per_portion,isvegan,isvegetarian,recipe_type, proposal_user_id`;

  const query = supabase
    .from("recipes")
    .select(isQueryForUser)
    .eq("verified", verified);

  if (title) {
    query.ilike("title", `%${title}%`);
  }
  if (recipeType) {
    query.match({ recipe_type: recipeType });
  }
  if (mealPortions) {
    query.eq("meal_portions", mealPortions);
  }
  if (kcalPerPortionFrom && kcalPerPortionTo) {
    query.gt("kcal_per_portion", kcalPerPortionFrom);
    query.lt("kcal_per_portion", kcalPerPortionTo);
  }
  if (isVegan) {
    query.eq("isvegan", isVegan);
  }
  if (isVegetarian) {
    query.eq("isvegetarian", isVegetarian);
  }
  if (isFavorites) {
    //TODO: wait for new table for store fav user recipes
    //query.filter("fav_users_recipes.user_id", "eq", userId);
  }
  const { data: recipes, error } = await query;
  if (error) {
    throw error.message;
  }
  return recipes;
};

export const useSearchRecipes = (
  queryParams: QueryParams,
  verified: boolean
) => {
  const { userId } = useUserId();
  const { error, data, isLoading } = useQuery(["getRecipes", queryParams], () =>
    fetchRecipes({ ...queryParams, verified, userId: userId || "" })
  );

  if (error) {
    toast.error(error as string);
  }

  return {
    entities: data || [],
    isLoading
  };
};
