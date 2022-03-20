import React from "react";
import styles from "./ProductsPage.module.css";
import { ActionButton } from "src/common/ActionButton/ActionButton";
import { FormInput, CategorySelect, Checkbox } from "src/common/Inputs";
import { OrangeButton } from "src/common/OrangeButton/OrangeButton";
import Link from "next/link";
import { FormikProps, FormikProvider } from "formik";
import { SearchProducts } from "../types";

export const ProductForm = ({
  formik,
  changeVerified = false
}: {
  formik: FormikProps<SearchProducts>;
  changeVerified: boolean;
}) => {
  return (
    <>
      <FormikProvider value={formik}>
        <form>
          <FormInput name="searchName" label="Search by" autocomplete="off" />
          <CategorySelect name="category" />
          {changeVerified ? (
            <Checkbox name="verified" label="zweryfikowane" />
          ) : (
            <Checkbox name="favorites" label="pokaz ulubione" />
          )}
          <ActionButton
            text="Filtruj"
            type="submit"
            onClick={formik.handleSubmit}
          />
        </form>
      </FormikProvider>
      <div className={styles.link}>
        <Link href="/products/add" passHref>
          <a>
            <OrangeButton text="add new product" />
          </a>
        </Link>
      </div>
    </>
  );
};
