import { FormikProvider, useFormik } from "formik";
import React from "react";
import { ActionButton } from "../../../common/ActionButton/ActionButton";
import { Checkbox } from "../../../common/Inputs/Checkbox/Checkbox";
import { FileInput } from "../../../common/Inputs/FileInput/FileInput";
import { FormInput } from "../../../common/Inputs/FormInput/FormInput";
import { RecipeTypeSelect } from "../../../common/Inputs/Select/RecipeTypeSelect";
import { TextArea } from "../../../common/Inputs/TextArea/TextArea";
import { addRecipeValidation } from "../../../common/validation";
import styles from "./RecipeAddEdit.module.css";

interface RecipeAddEditProperties {
  mode: "add" | "edit";
}
export const RecipeAddEdit = ({ mode = "add" }: RecipeAddEditProperties) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
      recipeType: "",
      mealPortions: 1,
      kcalPerPortion: 1,
      isVegan: false,
      isVegetarian: false,
      photo: null
    },
    enableReinitialize: true,
    validationSchema: addRecipeValidation,
    onSubmit: () => {
      if (mode === "add") {
        //TODO: implement it
      }
    }
  });
  return (
    <section className={styles.content}>
      <div className={styles.from}>
        <FormikProvider value={formik}>
          <form>
            <FormInput name="title" label="tytuł" />
            <TextArea name="desc" label="opis" />
            <FileInput name="photo" label="zdjecie przepisu" />
            <RecipeTypeSelect name="recipeType" />
            <FormInput
              name="mealPortions"
              type="number"
              label="liczba porcji"
            />
            <FormInput
              name="kcalPerPortion"
              type="number"
              label="kcal na porcje"
            />
            <Checkbox name="isVegan" label="wegańskie" />
            <Checkbox name="isVegetarian" label="wegetariańskie" />
            <p>Skladniki:</p>
            {/*TODO: implement recipe products*/}
            <ActionButton
              text={mode === "add" ? "Dodaj przepis" : "Edytuj"}
              onClick={formik.handleSubmit}
            />
          </form>
        </FormikProvider>
      </div>
    </section>
  );
};
