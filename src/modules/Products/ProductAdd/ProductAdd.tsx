import { FormikProvider, useFormik } from "formik";
import React from "react";
import { FormInput } from "../../../common/Inputs/FormInput/FormInput";
import * as yup from "yup";
import { CategorySelect } from "../../../common/Inputs/Select/CategorySelect";
import { ActionButton } from "../../../common/ActionButton/ActionButton";
import { useCreateProduct } from "../hooks/useCreateProduct";
import {
  categoryValidation,
  gtinCodeValidation,
  fileValidation
} from "../../../common/validation";
import { FileInput } from "../../../common/Inputs/FileInput/FileInput";
import styles from "./ProductAdd.module.css";

export const ProductAdd = () => {
  const createProductMutation = useCreateProduct();

  const formik = useFormik({
    initialValues: { category: "", name: "", gtin_code: "", photo: null },
    validationSchema: yup.object().shape({
      name: yup.string().required("Nazwa jest wymagana"),
      gtin_code: gtinCodeValidation,
      photo: fileValidation,
      category: categoryValidation
    }),
    onSubmit: values => {
      createProductMutation.mutate(values);
    }
  });

  return (
    <main className={styles.content}>
      <div className={styles.form}>
        <FormikProvider value={formik}>
          <form>
            <FormInput name="name" label="nazwa produktu" />
            <FormInput name="gtin_code" label="kod produktu" />
            <CategorySelect name="category" />
            <FileInput name="photo" label="zdjecie produktu" />
            <ActionButton
              text="Dodaj produkt"
              onClick={formik.handleSubmit}
              loading={createProductMutation.isLoading}
            />
          </form>
        </FormikProvider>
      </div>
    </main>
  );
};
