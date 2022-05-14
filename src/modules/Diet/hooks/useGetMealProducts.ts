import { supabase } from "src/utils/supabaseClient";

interface MealProduct {
  id: string;
  mealid: string;
  productid: string;
  iseaten: boolean;
  products: {
    name: string;
  };
}
export const getMealProducts = async (mealId: string) => {
  const { data, error } = await supabase
    .from<MealProduct>("productinmeal")
    .select("id,mealid,productid,iseaten,products:productid!inner(name)")
    .eq("mealid", mealId);
  if (error) {
    throw error.message;
  }
  return (
    data?.map(product => ({
      id: product.productid,
      name: product.products.name,
      isEaten: product.iseaten,
      type: "product" as const
    })) || []
  );
};
