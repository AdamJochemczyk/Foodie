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
    mealPortions: 0,
    kcalPerPortionFrom: 0,
    kcalPerPortionTo: 0,
    isVegan: false,
    isVegetarian: false,
    isFavorites: false
  });

  //TODO: rozbic formularz na glowne i szczegolowe
  const { entities, isLoading: entitiesLoading } = useSearchRecipes(
    queryParams,
    true
  );

  const formik = useFormik({
    initialValues: queryParams,
    validationSchema: searchRecipeValidation,
    onSubmit: values => {
      setQueryParams(values);
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
            <Checkbox name="isFavorites" label="ulubione" />
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
              <OrangeButton text="dodaj nowy przepis" size="small" />
            </a>
          </Link>
        </div>
      </section>
      <section className={styles.cards}>
        {!entitiesLoading
          ? entities.length > 0 &&
            entities.map(
              ({
                title,
                recipe_id,
                photo_link,
                meal_portions,
                kcal_per_portion,
                isvegetarian,
                isvegan,
                description,
                recipe_type,
                isFav
              }) => (
                <RecipeCard
                  key={recipe_id}
                  photoLink={photo_link}
                  title={title}
                  description={description}
                  recipeType={recipe_type}
                  mealPortions={meal_portions}
                  kcalPerPortions={kcal_per_portion}
                  isVegan={isvegan}
                  isVegetarian={isvegetarian}
                  recipeId={recipe_id}
                  isUserFav={
                    typeof isFav === "undefined" ? false : isFav.length > 0
                  }
                  href={`/recipes/${recipe_id}`}
                />
              )
            )
          : "Loading..."}
      </section>
    </article>
  );
};

export default RecipesPage;
