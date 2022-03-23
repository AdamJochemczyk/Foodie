import { useFormik } from "formik";
import { useState } from "react";
import { CardsAndFormLayout } from "src/common/CardsAndFormLayout/CardsAndFormLayout";
import { searchRecipeValidation } from "src/common/validation";
import { useSearchRecipes } from "../../hooks/useSearchRecipes";
import { SearchRecipes } from "../../types";
import { RecipeForm } from "./RecipeForm";
import { RecipesCards } from "./RecipesCards";

const RecipesPage = ({ mode = "user" }: { mode?: "user" | "admin" }) => {
  const [queryParams, setQueryParams] = useState<SearchRecipes>({
    title: "",
    recipeType: "",
    mealPortions: 0,
    kcalPerPortionFrom: 0,
    kcalPerPortionTo: 0,
    isVegan: false,
    isVegetarian: false,
    isFavorites: false,
    verified: mode === "user"
  });

  //TODO: rozbic formularz na glowne i szczegolowe
  const { entities, isLoading } = useSearchRecipes(queryParams);

  const formik = useFormik<SearchRecipes>({
    initialValues: queryParams,
    validationSchema: searchRecipeValidation,
    onSubmit: values => {
      setQueryParams(values);
    }
  });

  return (
    <CardsAndFormLayout
      title={mode === "user" ? "Przepisy" : "Edytuj przepis"}
      isLoading={isLoading}
      form={<RecipeForm formik={formik} />}
      cards={
        <RecipesCards entities={entities} withEditLink={mode === "admin"} />
      }
    />
  );
};

export default RecipesPage;
