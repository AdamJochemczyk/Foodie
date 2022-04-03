import React from "react";
import styles from "./ProductsPage.module.css";
import { ActionButton } from "src/common/ActionButton/ActionButton";
import { FormInput, CategorySelect, Checkbox } from "src/common/Inputs";
import { OrangeButton } from "src/common/OrangeButton/OrangeButton";
import { FormikProps, FormikProvider } from "formik";
import { SearchProducts } from "../../types";
import { LinkWrapper } from "src/common/LinkWrapper/LinkWrapper";

export const ProductForm = ({
  formik,
  changeVerified = false,
  isLoading
}: {
  formik: FormikProps<SearchProducts>;
  changeVerified: boolean;
  isLoading: boolean;
}) => {
  return (
    <>
      <FormikProvider value={formik}>
        <form>
          <FormInput name="searchName" label="Search by" autocomplete="off" />
          <CategorySelect name="category" />
          {changeVerified ? (
            <Checkbox name="verified" label="verified" />
          ) : (
            <Checkbox name="favorites" label="show favorites" />
          )}
          <ActionButton
            text="filter"
            type="submit"
            onClick={formik.handleSubmit}
            isLoading={isLoading}
          />
        </form>
      </FormikProvider>
      <div className={styles.link}>
        <LinkWrapper link="/products/add">
          <OrangeButton text="add new product" />
        </LinkWrapper>
      </div>
    </>
  );
};
