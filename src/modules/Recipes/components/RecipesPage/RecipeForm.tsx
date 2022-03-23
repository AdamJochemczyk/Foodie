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
  changeVerified = false
}: {
  formik: FormikProps<SearchRecipes>;
  changeVerified?: boolean;
}) => {
  return (
    <>
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
          {changeVerified ? (
            <Checkbox name="verified" label="zweryfikowane" />
          ) : (
            <Checkbox name="isFavorites" label="pokaz ulubione" />
          )}
          <ActionButton
            text="Filtruj"
            type="submit"
            onClick={formik.handleSubmit}
          />
        </form>
      </FormikProvider>
      <div className={styles.link}>
        <LinkWrapper link="/recipes/add">
          <OrangeButton text="dodaj nowy przepis" size="small" />
        </LinkWrapper>
      </div>
    </>
  );
};
