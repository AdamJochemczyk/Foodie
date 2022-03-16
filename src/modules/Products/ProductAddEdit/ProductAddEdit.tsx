import { FormikProvider, useFormik } from "formik";
import React from "react";
import { FormInput, CategorySelect, FileInput } from "src/common/Inputs";
import { ActionButton } from "src/common/ActionButton/ActionButton";
import { useCreateProduct } from "../hooks/useCreateProduct";
import {
  productAddValidationWithPhoto,
  productAddValidation
} from "src/common/validation";
import styles from "./ProductAddEdit.module.css";
import { useUpdateProduct } from "../hooks/useUpadateProduct";

interface ProductAddEditProperties {
  mode: "add" | "edit";
  initialValues?: {
    category: string;
    name: string;
    gtin_code: string;
    photo: null | File;
  };
}

export const ProductAddEdit = ({
  mode = "add",
  initialValues = { category: "", name: "", gtin_code: "", photo: null }
}: ProductAddEditProperties) => {
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema:
      mode === "add" ? productAddValidationWithPhoto : productAddValidation,
    onSubmit: values => {
      if (mode === "edit") {
        updateProductMutation.mutate(values);
      } else {
        createProductMutation.mutate(values);
      }
    }
  });

  return (
    <section className={styles.content}>
      <div className={styles.form}>
        <FormikProvider value={formik}>
          <form>
            <FormInput name="name" label="nazwa produktu" />
            <FormInput name="gtin_code" label="kod produktu" />
            <CategorySelect name="category" />
            <FileInput
              name="photo"
              label={
                mode === "add" ? "zdjecie produktu" : "podmien zdjecie produktu"
              }
            />
            <ActionButton
              text={mode === "add" ? "Dodaj produkt" : "Edytuj"}
              onClick={formik.handleSubmit}
              loading={
                mode === "add"
                  ? createProductMutation.isLoading
                  : updateProductMutation.isLoading
              }
            />
          </form>
        </FormikProvider>
      </div>
    </section>
  );
};
