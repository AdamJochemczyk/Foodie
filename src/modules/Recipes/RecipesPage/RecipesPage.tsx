import { FormikProvider, useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { ActionButton } from "../../../common/ActionButton/ActionButton";
import { Checkbox } from "../../../common/Inputs/Checkbox/Checkbox";
import { FormInput } from "../../../common/Inputs/FormInput/FormInput";
import { RecipeTypeSelect } from "../../../common/Inputs/Select/RecipeTypeSelect";
import { OrangeButton } from "../../../common/OrangeButton/OrangeButton";
import { searchRecipeValidation } from "../../../common/validation";
import { useSearchRecipes } from "../hooks/useSearchRecipes";
import { RecipeCard } from "../RecipeCard/RecipeCard";
import styles from "./RecipesPage.module.css";

const RecipesPage = () => {
  const [queryParams, setQueryParams] = useState({
    title: "",
    recipeType: "",
    mealPortions: "",
    kcalPerPortionFrom: "",
    kcalPerPortionTo: "",
    isVegan: false,
    isVegetarian: false
  });

  //TODO: implement searching
  const { entities, isLoading: entitiesLoading } =
    useSearchRecipes(queryParams);

  const formik = useFormik({
    initialValues: {
      title: "",
      recipeType: "",
      mealPortions: "",
      kcalPerPortionFrom: "",
      kcalPerPortionTo: "",
      isVegan: false,
      isVegetarian: false
    },
    validationSchema: searchRecipeValidation,
    onSubmit: ({
      title,
      recipeType,
      mealPortions,
      kcalPerPortionFrom,
      kcalPerPortionTo,
      isVegan,
      isVegetarian
    }) => {
      setQueryParams({
        title,
        recipeType,
        mealPortions,
        kcalPerPortionFrom,
        kcalPerPortionTo,
        isVegan,
        isVegetarian
      });
    }
  });

  return (
    <article className={styles.recipes}>
      <section className={styles.filters}>
        <FormikProvider value={formik}>
          <form>
            <FormInput name="title" label="Search by" />
            <RecipeTypeSelect name="recipeType" />
            <FormInput name="mealPortions" label="Ilosc porcji" type="number" />
            <p>Kalorie na porcje</p>
            <FormInput name="kcalPerPortionFrom" label="min" type="number" />
            <FormInput name="kcalPerPortionTo" label="max" type="number" />
            <Checkbox name="isVegan" label="Wegański" />
            <Checkbox name="isVegetarian" label="Wegetariański" />
            <ActionButton
              text="Filtruj"
              type="submit"
              onClick={formik.handleSubmit}
            />
          </form>
        </FormikProvider>
        <div className={styles.link}>
          <Link href="/recipes/add" passHref>
            <a>
              <OrangeButton text="add new recipe" />
            </a>
          </Link>
        </div>
      </section>
      <section className={styles.cards}>
        {/* //TODO: implement searching */}
        {entitiesLoading
          ? entities.map(() => (
              <RecipeCard
                key={1}
                photoLink="/link"
                title="Jajecznica"
                description="jajecznica po zbojecku"
                recipeType="sniadanie"
                mealPortions={2}
                kcalPerPortions={400}
                isVegan={false}
                isVegetarian={false}
              />
            ))
          : "Loading..."}
      </section>
    </article>
  );
};

export default RecipesPage;
