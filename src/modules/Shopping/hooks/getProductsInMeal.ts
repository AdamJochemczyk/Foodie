import { countProduct } from "./utils";
import { supabase } from "src/utils/supabaseClient";
import { DietSearch } from "src/modules/Diet/types";

interface ProductsInMealResponse {
  userid: string;
  mealdate: string;
  productinmeal: {
    productid: string;
    products: {
      name: string;
    };
  }[];
}

const getProductsInMeals = (data: ProductsInMealResponse[]) => {
  const productsInMeals = data.map(({ productinmeal }) => {
    return productinmeal.map(({ productid, products }) => ({
      id: productid,
      name: products.name,
      count: 1
    }));
  });
  const productsInDiet = productsInMeals.flat(2);
  return countProduct(productsInDiet);
};

export const getProductsInMeal = async (
  queryParams: DietSearch,
  userId: string
) => {
  const { data, error } = await supabase
    .from<ProductsInMealResponse>("usermeal")
    .select("productinmeal(productid,products(name))")
    .eq("userid", userId)
    .gte("mealdate", queryParams.startDate)
    .lte("mealdate", queryParams.endDate);
  return { products: getProductsInMeals(data || []), error };
};
