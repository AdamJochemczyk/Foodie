import { toast } from "react-toastify";
import { useQuery } from "react-query";
import { getMealProducts } from "./useGetMealProducts";
import { getMealRecipes } from "./useGetMealRecipes";

const getMealIngredients = async ({ mealId }: { mealId: string }) => {
  if (mealId === "") {
    return [];
  }
  const products = getMealProducts(mealId);
  const recipes = getMealRecipes(mealId);
  const [userProducts, userRecipes] = await Promise.all([products, recipes]);
  return [...userProducts, ...userRecipes];
};

export const useGetMealIngredients = ({ mealId }: { mealId: string }) => {
  const { error, data, isLoading, isFetching } = useQuery(
    ["getMealIngredients", mealId],
    () => getMealIngredients({ mealId })
  );
  if (error) {
    toast.error(error as string);
  }
  return {
    meal: data || [],
    isLoading,
    isFetching
  };
};
