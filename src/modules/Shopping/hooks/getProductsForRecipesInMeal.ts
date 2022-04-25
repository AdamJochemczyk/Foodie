import { DietSearch } from "src/modules/Diet/types";
import { supabase } from "src/utils/supabaseClient";
import { countProduct } from "./utils";

interface ProductsForRecipesResponse {
  recipeinmeal: {
    recipes: {
      ingredients: {
        measure: string;
        productcount: number;
        productid: string;
        products: {
          name: string;
        };
      }[];
    };
  }[];
  userid: string;
  mealdate: string;
}

const getProductsForRecipes = (data: ProductsForRecipesResponse[]) => {
  const recipeIngredients = data.map(({ recipeinmeal }) =>
    recipeinmeal.map(({ recipes }) => {
      return recipes.ingredients.map(
        ({ productid, products, productcount }) => {
          return {
            id: productid,
            name: products.name,
            count: productcount
          };
        }
      );
    })
  );
  const productsInDiet = recipeIngredients.flat(2);
  return countProduct(productsInDiet);
};

export const getProductsForRecipesInMeal = async (
  queryParams: DietSearch,
  userId: string
) => {
  const { data, error } = await supabase
    .from<ProductsForRecipesResponse>("usermeal")
    .select(
      "recipeinmeal(recipes(ingredients(productid,productcount,measure,products(name))))"
    )
    .eq("userid", userId)
    .gte("mealdate", queryParams.startDate)
    .lte("mealdate", queryParams.endDate);

  return { recipes: getProductsForRecipes(data || []), error };
};
