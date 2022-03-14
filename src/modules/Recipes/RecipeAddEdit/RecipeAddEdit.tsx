import { FormikProvider, useFormik } from "formik";
import React from "react";
import { ActionButton } from "../../../common/ActionButton/ActionButton";
import { Checkbox } from "../../../common/Inputs/Checkbox/Checkbox";
import { FileInput } from "../../../common/Inputs/FileInput/FileInput";
import { FormInput } from "../../../common/Inputs/FormInput/FormInput";
import { MeasureTypeSelect } from "../../../common/Inputs/Select/MeasureTypeSelect";
import { RecipeTypeSelect } from "../../../common/Inputs/Select/RecipeTypeSelect";
import { TextArea } from "../../../common/Inputs/TextArea/TextArea";
import { OrangeButton } from "../../../common/OrangeButton/OrangeButton";
import { SearchWithAPI } from "../../../common/SearchWithAPI/SearchWithAPI";
import { addRecipeValidation } from "../../../common/validation";
import { useFindProductByName } from "../../Products/hooks/useFindProductByName";
import { useAddRecipe } from "../hooks/useCreateRecipe";
import styles from "./RecipeAddEdit.module.css";

interface RecipeAddEditProperties {
  mode: "add" | "edit";
}
interface RecipeProducts {
  product: string;
  measureType: string;
  count: number;
}
interface AddRecipeForm {
  title: string;
  desc: string;
  recipeType: string;
  mealPortions: number;
  kcalPerPortion: number;
  isVegan: boolean;
  isVegetarian: boolean;
  photo: null | File;
  product: { value: string; label: string } | null;
  count: number;
  measureType: string;
  recipeProducts: RecipeProducts[];
}

export const RecipeAddEdit = ({ mode = "add" }: RecipeAddEditProperties) => {
  const addRecipeMutation = useAddRecipe();
  const formik = useFormik<AddRecipeForm>({
    initialValues: {
      title: "",
      desc: "",
      recipeType: "",
      mealPortions: 1,
      kcalPerPortion: 1,
      isVegan: false,
      isVegetarian: false,
      photo: null,
      product: null,
      count: 0,
      measureType: "",
      recipeProducts: []
    },
    enableReinitialize: true,
    validationSchema: addRecipeValidation,
    onSubmit: values => {
      if (mode === "add") {
        addRecipeMutation.mutate(values);
      }
    }
  });

  const handleAddIngredient = () => {
    //TODO: add validation
    const { product, count, measureType } = formik.values;
    formik.setFieldValue("recipeProducts", [
      ...formik.values.recipeProducts,
      { product: product?.value, count, measureType }
    ]);
    formik.setFieldValue("product", "");
    formik.setFieldValue("count", "");
    formik.setFieldValue("measureType", "");
  };

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
            <div className={styles.ingredientSubForm}>
              <SearchWithAPI
                name="product"
                label="Znajdź produkt"
                dataSource={useFindProductByName}
              />
              <FormInput name="count" label="ilość" type="number" />
              <MeasureTypeSelect name="measureType" />
              <OrangeButton
                text="dodaj składnik"
                size="small"
                onClick={handleAddIngredient}
              />
              {/* TODO: add table to remove products */}
            </div>
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
