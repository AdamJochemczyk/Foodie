import { FormikProvider, useFormik } from "formik";
import React from "react";
import { ActionButton } from "src/common/ActionButton/ActionButton";
import {
  FormInput,
  FileInput,
  Checkbox,
  MeasureTypeSelect,
  RecipeTypeSelect,
  TextArea,
  SearchWithAPI
} from "src/common/Inputs";
import { OrangeButton } from "src/common/OrangeButton/OrangeButton";
import { addRecipeValidation, recipeValidation } from "src/common/validation";
import { useFindProductByName } from "src/modules/Products/hooks/useFindProductByName";
import { RecipeProducts, useAddRecipe } from "../hooks/useCreateRecipe";
import styles from "./RecipeAddEdit.module.css";
import { toast } from "react-toastify";
import { useRemoveIngredient } from "../hooks/useRemoveIngredient";
import { useRouter } from "next/router";
import Image from "next/image";
import { insertRecipeIngredient } from "../hooks/insertRecipeIngredient";
import { useUpdateRecipe } from "../hooks/useUpdateRecipe";

interface RecipeForm {
  title: string;
  description: string;
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
interface RecipeAddEditProperties {
  mode: "add" | "edit";
  initialValues?: RecipeForm;
  photoLink?: string;
  ingredientsLoading?: boolean;
}

export const RecipeAddEdit = ({
  mode = "add",
  initialValues = {
    title: "",
    description: "",
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
  photoLink,
  ingredientsLoading = false
}: RecipeAddEditProperties) => {
  const addRecipeMutation = useAddRecipe();
  const removeIngredient = useRemoveIngredient();
  const updateMutation = useUpdateRecipe();
  const router = useRouter();

  const formik = useFormik<RecipeForm>({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: mode === "add" ? addRecipeValidation : recipeValidation,
    onSubmit: values => {
      if (mode === "add") {
        addRecipeMutation.mutate(values);
      } else if (mode === "edit") {
        updateMutation.mutate(values);
      }
    }
  });

  const handleAddIngredient = () => {
    const { product, count, measureType } = formik.values;
    if (!product) {
      return toast.error("Wybierz produkt");
    }
    if (count <= 0) {
      return toast.error("Ilość musi być dodatnia");
    }
    if (!measureType) {
      return toast.error("Wybierz jednostkę");
    }
    if (
      formik.values.recipeProducts.some(
        el => el.product.label === product.label
      )
    ) {
      return toast.error("Skladnik został już dodany");
    }
    if (product && count > 0 && measureType) {
      formik.setFieldValue("recipeProducts", [
        ...formik.values.recipeProducts,
        { product, count, measureType }
      ]);
      formik.setFieldValue("count", "");
    }
    if (product && count > 0 && measureType && mode === "edit") {
      const { recipe_id } = router.query;
      if (typeof recipe_id === "string") {
        insertRecipeIngredient({
          product_id: product.value,
          recipe_id,
          product_count: count,
          measure: measureType
        });
      }
    }
  };

  const handleRemoveProduct = (id: string) => {
    const { recipeProducts } = formik.values;
    const filteredProducts = recipeProducts.filter(
      el => el.product.value !== id
    );
    formik.setFieldValue("recipeProducts", filteredProducts);
    if (mode === "edit") {
      removeIngredient.mutate(id);
    }
  };

  return (
    <section className={styles.content}>
      <div className={styles.from}>
        <FormikProvider value={formik}>
          <form>
            <FormInput name="title" label="tytuł" />
            <TextArea name="description" label="opis" />
            {mode === "edit" && typeof photoLink === "string" ? (
              <div className={styles.imgBox}>
                <Image src={photoLink} alt="recipe" width={300} height={300} />
              </div>
            ) : null}
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
            </div>
            {!ingredientsLoading ? (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <td>Produkt</td>
                    <td>Ilość</td>
                    <td>Jednostka</td>
                    <td>Akcja</td>
                  </tr>
                </thead>
                <tbody>
                  {formik.values.recipeProducts.map(
                    ({ product, count, measureType }) => (
                      <tr key={product.value}>
                        <td>{product.label}</td>
                        <td>{count}</td>
                        <td>{measureType}</td>
                        <td>
                          <OrangeButton
                            variant="secondary"
                            text="Usun produkt"
                            size="small"
                            onClick={() => handleRemoveProduct(product.value)}
                          />
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            ) : (
              <p>Loading...</p>
            )}
            <ActionButton
              text={mode === "add" ? "Dodaj przepis" : "Edytuj"}
              onClick={formik.handleSubmit}
              type="submit"
            />
          </form>
        </FormikProvider>
      </div>
    </section>
  );
};
