import React from "react";
import styles from "./ProductsPage.module.css";
import { Button } from "src/common/Button/Button";
import { FormInput, CategorySelect, Checkbox } from "src/common/Inputs";
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
          <Button
            text="filter"
            type="submit"
            size="small"
            onClick={formik.handleSubmit}
            isLoading={isLoading}
          />
        </form>
      </FormikProvider>
      <div className={styles.link}>
        <LinkWrapper link="/products/add">
          <Button
            text="add new product"
            color="orange"
            variant="primary"
            size="small"
          />
        </LinkWrapper>
      </div>
    </>
  );
};
