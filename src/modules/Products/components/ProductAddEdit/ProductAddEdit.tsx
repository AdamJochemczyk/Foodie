import { FormikProvider, useFormik } from "formik";
import React from "react";
import { FormInput, CategorySelect, FileInput } from "src/common/Inputs";
import { ActionButton } from "src/common/ActionButton/ActionButton";
import { useCreateProduct, useUpdateProduct } from "../../hooks";
import {
  productAddValidationWithPhoto,
  productAddValidation
} from "src/common/validation";
import styles from "./ProductAddEdit.module.css";
import { ProductAddEditProperties } from "../../types";

export const ProductAddEdit = ({
  mode = "add",
  initialValues = { category: "", name: "", gtincode: "", photo: null }
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
      <h1>{mode === "add" ? "Add product" : "Edit product"}</h1>
      <div className={styles.form}>
        <FormikProvider value={formik}>
          <form>
            <FormInput name="name" label="product name" />
            <FormInput name="gtincode" label="product code" />
            <CategorySelect name="category" />
            <FileInput
              name="photo"
              label={mode === "add" ? "product photo" : "change product photo"}
            />
            <ActionButton
              text={mode === "add" ? "Add" : "Edit"}
              onClick={formik.handleSubmit}
              isLoading={
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
