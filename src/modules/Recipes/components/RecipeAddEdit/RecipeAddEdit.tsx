import { FormikProvider, useFormik } from "formik";
import React, { useMemo } from "react";
import { Button } from "src/common/Button/Button";
import {
  FormInput,
  FileInput,
  Checkbox,
  MeasureTypeSelect,
  RecipeTypeSelect,
  TextArea,
  SearchWithAPI
} from "src/common/Inputs";
import { addRecipeValidation, recipeValidation } from "src/common/validation";
import { useFindProductByName } from "src/modules/Products/hooks/useFindProductByName";
import {
  useCreateRecipe,
  useRemoveIngredients,
  insertRecipeIngredient,
  useUpdateRecipe
} from "../../hooks";
import styles from "./RecipeAddEdit.module.css";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Image from "next/image";
import { RecipeForm } from "../../types";
import { Table } from "src/common/Table/Table";

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
    recipetype: "",
    mealportions: 1,
    kcalperportion: 1,
    isvegan: false,
    isvegetarian: false,
    photo: null,
    product: null,
    count: 0,
    measuretype: "",
    recipeproducts: [],
    imgCode: ""
  },
  photoLink,
  ingredientsLoading = false
}: RecipeAddEditProperties) => {
  const addRecipeMutation = useCreateRecipe();
  const removeIngredients = useRemoveIngredients();
  const updateRecipeMutation = useUpdateRecipe();
  const router = useRouter();

  const formik = useFormik<RecipeForm>({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: mode === "add" ? addRecipeValidation : recipeValidation,
    onSubmit: values => {
      if (mode === "add") {
        addRecipeMutation.mutate(values);
      } else if (mode === "edit") {
        updateRecipeMutation.mutate(values);
      }
    }
  });

  const handleAddIngredient = () => {
    const { product, count, measuretype } = formik.values;
    if (!product) {
      return toast.error("Choose product");
    }
    if (count <= 0) {
      return toast.error("Count must be positive");
    }
    if (!measuretype) {
      return toast.error("Check entity");
    }
    if (
      formik.values.recipeproducts.some(
        el => el.product.label === product.label
      )
    ) {
      return toast.error("Ingredient already added");
    }
    if (product && count > 0 && measuretype) {
      formik.setFieldValue("recipeproducts", [
        ...formik.values.recipeproducts,
        { product, count, measuretype }
      ]);
      formik.setFieldValue("count", "");
    }
    if (product && count > 0 && measuretype && mode === "edit") {
      const { recipe_id } = router.query;
      if (typeof recipe_id === "string") {
        insertRecipeIngredient([
          {
            productid: product.value,
            recipeid: recipe_id,
            productcount: count,
            measure: measuretype
          }
        ]);
      }
    }
  };

  const handleRemoveProduct = (id: string) => {
    const { recipeproducts } = formik.values;
    const filteredProducts = recipeproducts.filter(
      el => el.product.value !== id
    );
    formik.setFieldValue("recipeproducts", filteredProducts);
    if (mode === "edit") {
      removeIngredients.mutate([id]);
    }
  };

  const tableHeaders = useMemo(
    () => ["Product", "Count", "Entity", "Action"],
    []
  );

  return (
    <section className={styles.content}>
      <div className={styles.from}>
        <FormikProvider value={formik}>
          <form>
            <FormInput name="title" label="title" />
            <TextArea name="description" label="description" />
            {mode === "edit" &&
            !formik.values.photo &&
            typeof photoLink === "string" ? (
              <div className={styles.imgBox}>
                <Image src={photoLink} alt="recipe" width={300} height={300} />
              </div>
            ) : null}
            <FileInput name="photo" label="recipe photo" />
            <RecipeTypeSelect name="recipetype" />
            <FormInput
              name="mealportions"
              type="number"
              label="meal portions"
            />
            <FormInput
              name="kcalperportion"
              type="number"
              label="kcal per portion"
            />
            <Checkbox name="isvegan" label="vegan" />
            <Checkbox name="isvegetarian" label="vegetarian" />
            <p>Ingredients:</p>
            <div className={styles.ingredientSubForm}>
              <SearchWithAPI
                name="product"
                label="find product"
                dataSource={useFindProductByName}
              />
              <FormInput name="count" label="count" type="number" />
              <MeasureTypeSelect name="measuretype" />
              <div className={styles.addIngredientBtn}>
                <Button
                  text="add ingredient"
                  size="small"
                  color="orange"
                  variant="primary"
                  onClick={handleAddIngredient}
                />
              </div>
            </div>
            <Table isLoading={ingredientsLoading} headers={tableHeaders}>
              {formik.values.recipeproducts.map(
                ({ product, count, measuretype }) => (
                  <tr key={product.value}>
                    <td>{product.label}</td>
                    <td>{count}</td>
                    <td>{measuretype}</td>
                    <td>
                      <Button
                        variant="danger"
                        text="Remove product"
                        size="small"
                        onClick={() => handleRemoveProduct(product.value)}
                      />
                    </td>
                  </tr>
                )
              )}
            </Table>
            <Button
              text={mode === "add" ? "Add recipe" : "Edit"}
              onClick={formik.handleSubmit}
              type="submit"
              size="small"
              isLoading={
                mode === "add"
                  ? addRecipeMutation.isLoading
                  : updateRecipeMutation.isLoading
              }
            />
          </form>
        </FormikProvider>
      </div>
    </section>
  );
};
