import { useState, useEffect } from "react";
import { useSearchProducts } from "src/modules/Products/hooks";
import { useSearchRecipes } from "src/modules/Recipes/hooks";
import { PossibleProductsInMeal } from "./PossibleMealIngredients/PossibleProductsInMeal";
import { PossibleRecipesInMeal } from "./PossibleMealIngredients/PossibleRecipesInMeal";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { MealPlan } from "./PossibleMealIngredients/MealPlan";
import styles from "./List.module.css";
import { MealPlanState, useReorderMealPlan } from "./reorderMealPlan";
import { useGetMealIngredients } from "../../hooks/useGetMealIngredients";
import { useRouter } from "next/router";

export const MealPage = () => {
  const router = useRouter();
  const { meal_id } = router.query;
  const { reorderMealPlan } = useReorderMealPlan(meal_id as string);

  const {
    entities: products,
    isLoading: productsLoading,
    isFetching: productsFetching
  } = useSearchProducts({
    searchName: "",
    category: "",
    verified: true,
    favorites: true
  });
  const {
    entities: recipes,
    isLoading: recipesLoading,
    isFetching: recipesFetching
  } = useSearchRecipes({
    title: "",
    recipeType: "",
    mealPortions: 0,
    kcalPerPortionFrom: 0,
    kcalPerPortionTo: 0,
    isVegan: false,
    isVegetarian: false,
    isFavorites: true,
    verified: true
  });

  const {
    meal,
    isLoading: ingredientsLoading,
    isFetching: ingredientsFetching
  } = useGetMealIngredients({
    mealId: meal_id as string
  });

  const [mealPlan, setMealPlan] = useState<MealPlanState>({
    products: products,
    meal: meal,
    recipes: recipes
  });

  useEffect(() => {
    setMealPlan({
      products: products,
      meal: meal,
      recipes: recipes
    });
    // fetching means refresh UI after remove from fav recipe or product
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsFetching, recipesFetching, ingredientsFetching]);

  const onDragEnd = ({ source, destination }: DropResult) => {
    //dropped outside list
    if (!destination) return;
    setMealPlan(reorderMealPlan(mealPlan, source, destination));
  };

  if (productsLoading || recipesLoading || ingredientsLoading) {
    return <p>Please wait...</p>;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <article className={styles.container}>
        <section className={styles.planner}>
          <PossibleProductsInMeal
            isLoading={productsLoading}
            entities={mealPlan.products}
            listId="products"
          />
          <MealPlan isLoading={false} entities={mealPlan.meal} listId="meal" />
          <PossibleRecipesInMeal
            isLoading={recipesLoading}
            entities={mealPlan.recipes}
            listId="recipes"
          />
        </section>
      </article>
    </DragDropContext>
  );
};
