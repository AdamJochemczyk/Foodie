export interface SearchRecipes {
  title: string;
  recipeType: string;
  mealPortions: number;
  kcalPerPortionFrom: number;
  kcalPerPortionTo: number;
  isVegan: boolean;
  isVegetarian: boolean;
  isFavorites: boolean;
  verified: boolean;
}
export interface FetchRecipes extends SearchRecipes {
  userId: string;
}
export interface RecipeProducts {
  product: { value: string; label: string };
  measureType: string;
  count: number;
}
export interface RecipeProperties {
  title: string;
  photoLink: string;
  description: string;
  recipeType: string;
  mealPortions: number;
  kcalPerPortion: number;
  isVegan: boolean;
  isVegetarian: boolean;
  proposalUserId: string;
  recipeProducts: RecipeProducts[];
}
export interface RecipeIngredient {
  productid: string;
  recipeid: string;
  productcount: number;
  measure: string;
}
export interface Recipe {
  title: string;
  description: string;
  recipeType: string;
  mealPortions: number;
  kcalPerPortion: number;
  isVegan: boolean;
  isVegetarian: boolean;
  photo: File | null;
}
export interface UpdateRecipe extends Recipe {
  recipeId: string;
  photoLink?: string;
}
export interface CreateRecipeProperties extends Recipe {
  recipeProducts: RecipeProducts[];
}
export interface Ingredients {
  id: string;
  name: string;
  measure: string;
  count: number;
}
export interface DeleteRecipe {
  id: string;
  title: string;
  ingredients: Ingredients[];
}
export interface RecipeForm extends Recipe {
  product: { value: string; label: string } | null;
  count: number;
  measureType: string;
  recipeProducts: RecipeProducts[];
}
export interface RecipeCardProperties {
  photoLink: string;
  title: string;
  description: string;
  recipeType: string;
  mealPortions: number;
  kcalPerPortions: number;
  isVegan: boolean;
  isVegetarian: boolean;
  recipeId: string;
  isUserFav?: boolean;
  href: string;
  btnText: string;
}
