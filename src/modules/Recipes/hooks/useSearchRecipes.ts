interface QueryParams {
  title: string;
  recipeType: string;
  mealPortions: string;
  kcalPerPortionFrom: string;
  kcalPerPortionTo: string;
  isVegan: boolean;
  isVegetarian: boolean;
}

//TODO: implement searching recipes
export const useSearchRecipes = (queryParams: QueryParams) => {
  return {
    isLoading: false,
    entities: [],
    queryParams
  };
};
