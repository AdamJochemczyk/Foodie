import { getProductsInMeal } from "./getProductsInMeal";
import { useUser } from "src/utils/useUser";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import { DietSearch } from "./../../Diet/types";
import { getProductsForRecipesInMeal } from "./getProductsForRecipesInMeal";
import { compareWithFridge, countProduct } from "./utils";
import { getProductsFromFridge } from "./getProductsFromFridge";

const getShoppingList = async (queryParams: DietSearch, userId: string) => {
  const productsReq = getProductsInMeal(queryParams, userId);
  const recipesReq = getProductsForRecipesInMeal(queryParams, userId);
  const productFromFridgeReq = getProductsFromFridge(userId);
  const [
    { products, error: productsError },
    { recipes, error: recipesError },
    { productsInFridge, error: fridgeError }
  ] = await Promise.all([productsReq, recipesReq, productFromFridgeReq]);
  if (productsError || recipesError || fridgeError) {
    throw new Error("Cannot generate shopping list");
  }
  const productsToBuy = countProduct([...products, ...recipes]);
  return compareWithFridge(productsInFridge, productsToBuy);
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
