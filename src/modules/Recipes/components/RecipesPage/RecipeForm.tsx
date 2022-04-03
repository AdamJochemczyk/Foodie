import { FormikProps, FormikProvider } from "formik";
import React from "react";
import { ActionButton } from "src/common/ActionButton/ActionButton";
import { FormInput, Checkbox, RecipeTypeSelect } from "src/common/Inputs";
import { LinkWrapper } from "src/common/LinkWrapper/LinkWrapper";
import { OrangeButton } from "src/common/OrangeButton/OrangeButton";
import { SearchRecipes } from "../../types";
import styles from "./RecipesPage.module.css";

export const RecipeForm = ({
  formik,
  changeVerified = false,
  isLoading
}: {
  formik: FormikProps<SearchRecipes>;
  changeVerified?: boolean;
  isLoading: boolean;
}) => {
  return (
    <>
      <FormikProvider value={formik}>
        <form>
          <FormInput name="title" label="Search by" />
          <RecipeTypeSelect name="recipeType" />
          <FormInput name="mealPortions" label="Meal portions" type="number" />
          <p>Kcal per portion</p>
          <FormInput name="kcalPerPortionFrom" label="min" type="number" />
          <FormInput name="kcalPerPortionTo" label="max" type="number" />
          <Checkbox name="isVegan" label="vegan" />
          <Checkbox name="isVegetarian" label="vegetarian" />
          {changeVerified ? (
            <Checkbox name="verified" label="verified" />
          ) : (
            <Checkbox name="isFavorites" label="show favorite" />
          )}
          <ActionButton
            text="filter"
            type="submit"
            onClick={formik.handleSubmit}
            isLoading={isLoading}
          />
        </form>
      </FormikProvider>
      <div className={styles.link}>
        <LinkWrapper link="/recipes/add">
          <OrangeButton text="add new recipe" size="small" />
        </LinkWrapper>
      </div>
    </>
  );
};
