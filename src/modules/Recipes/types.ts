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
  measuretype: string;
  count: number;
}
export interface RecipeProperties {
  title: string;
  description: string;
  recipetype: string;
  mealportions: number;
  kcalperportion: number;
  isvegan: boolean;
  isvegetarian: boolean;
  photolink: string;
  proposaluserid: string;
  recipeproducts: RecipeProducts[];
  uuid: string;
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
  recipetype: string;
  mealportions: number;
  kcalperportion: number;
  isvegan: boolean;
  isvegetarian: boolean;
  photo: File | null;
  imgCode: string;
}
export interface UpdateRecipe extends Recipe {
  recipeid: string;
  photolink?: string;
  photo: File | null;
  imgCode: string;
}
export interface CreateRecipeProperties extends Recipe {
  recipeproducts: RecipeProducts[];
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
  measuretype: string;
  recipeproducts: RecipeProducts[];
}
export interface RecipeCardProperties {
  title: string;
  description: string;
  recipetype: string;
  mealportions: number;
  kcalperportion: number;
  isvegan: boolean;
  isvegetarian: boolean;
  photoLink: string;
  recipeId: string;
  isUserFav?: Array<{ userid: string }>;
  href: string;
  btnText: string;
  showFavButton: boolean;
}
