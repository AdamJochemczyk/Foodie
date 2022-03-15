import { FormikProvider, useFormik } from "formik";
import React from "react";
import { ActionButton } from "../../../common/ActionButton/ActionButton";
import {
  FormInput,
  FileInput,
  Checkbox,
  MeasureTypeSelect,
  RecipeTypeSelect,
  TextArea,
  SearchWithAPI
} from "../../../common/Inputs";
import { OrangeButton } from "../../../common/OrangeButton/OrangeButton";
import { addRecipeValidation } from "../../../common/validation";
import { useFindProductByName } from "../../Products/hooks/useFindProductByName";
import { RecipeProducts, useAddRecipe } from "../hooks/useCreateRecipe";
import styles from "./RecipeAddEdit.module.css";
import { toast } from "react-toastify";

interface RecipeAddEditProperties {
  mode: "add" | "edit";
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
    const { product, count, measureType } = formik.values;
    if (!product) {
      toast.error("Wybierz produkt");
    }
    if (count <= 0) {
      toast.error("Ilość musi być dodatnia");
    }
    if (!measureType) {
      toast.error("Wybierz jednostkę");
    }
    if (product && count > 0 && measureType) {
      if (
        formik.values.recipeProducts.some(
          el => el.product.value === product.value
        )
      ) {
        toast.error("Skladnik juz został dodany");
      } else {
        formik.setFieldValue("recipeProducts", [
          ...formik.values.recipeProducts,
          { product, count, measureType }
        ]);
        formik.setFieldValue("count", "");
      }
    }
  };

  const handleRemoveProduct = (productId: string) => {
    const { recipeProducts } = formik.values;
    const filteredProducts = recipeProducts.filter(
      el => el.product.value !== productId
    );
    formik.setFieldValue("recipeProducts", filteredProducts);
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
