import { getProductsInMeal } from "./getProductsInMeal";
import { useUser } from "src/utils/useUser";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import { DietSearch } from "./../../Diet/types";
import { getProductsForRecipesInMeal } from "./getProductsForRecipesInMeal";
import { countProduct } from "./utils";

const getShoppingList = async (queryParams: DietSearch, userId: string) => {
  const productsReq = getProductsInMeal(queryParams, userId);
  const recipesReq = getProductsForRecipesInMeal(queryParams, userId);
  const [{ products, error: productsError }, { recipes, error: recipesError }] =
    await Promise.all([productsReq, recipesReq]);
  if (productsError || recipesError) {
    throw new Error("Cannot generate shopping list");
  }
  return countProduct([...products, ...recipes]);
};

export const useGetShoppingList = (queryParams: DietSearch) => {
  const { userId } = useUser();
  const { error, data, isLoading } = useQuery(
    ["getShoppingList", queryParams, userId],
    () => getShoppingList(queryParams, userId)
  );
  if (error) {
    toast.error(error as string);
  }

  return {
    isLoading,
    entities: data || []
  };
};
