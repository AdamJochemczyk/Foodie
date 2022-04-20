import { useState, useEffect } from "react";
import { useSearchProducts } from "src/modules/Products/hooks";
import { useSearchRecipes } from "src/modules/Recipes/hooks";
import { PossibleProductsInMeal } from "./PossibleMealIngredients/PossibleProductsInMeal";
import { PossibleRecipesInMeal } from "./PossibleMealIngredients/PossibleRecipesInMeal";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { MealPlan } from "./PossibleMealIngredients/MealPlan";
import styles from "./List.module.css";
import { MealPlanState, reorderMealPlan } from "./reorderMealPlan";

export const MealPage = () => {
  const { entities: products, isLoading: productsLoading } = useSearchProducts({
    searchName: "",
    category: "",
    verified: true,
    favorites: true
  });
  const { entities: recipes, isLoading: recipesLoading } = useSearchRecipes({
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
  //TODO: hook to get meal by id
  //TODO: get meal data from BE
  const [mealPlan, setMealPlan] = useState<MealPlanState>({
    products: products,
    meal: [],
    recipes: recipes
  });

  useEffect(() => {
    setMealPlan({
      products: products,
      meal: [],
      recipes: recipes
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipesLoading, productsLoading]);

  const onDragEnd = ({ source, destination }: DropResult) => {
    //dropped outside list
    if (!destination) return;
    setMealPlan(reorderMealPlan(mealPlan, source, destination));
  };

  if (productsLoading || recipesLoading) {
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
