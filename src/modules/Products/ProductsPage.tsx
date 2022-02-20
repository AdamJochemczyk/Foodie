import { FormikProvider, useFormik } from "formik";
import React, { useState } from "react";
import { ActionButton } from "../../common/ActionButton/ActionButton";
import { FormInput } from "../../common/Inputs/FormInput/FormInput";
import { CategorySelect } from "../../common/Inputs/Select/CategorySelect";
import { useSearchProducts } from "./hooks/useSearchProducts";
import styles from "./ProductsPage.module.css";

export const ProductsPage = () => {
  const [searchName, setSearchName] = useState("");
  const [category, setCategory] = useState("");
  const [favorites, setFavorites] = useState(false);

  const { entities, isLoading: entitiesLoading } = useSearchProducts({
    searchName,
    category,
    favorites
  });

  const formik = useFormik({
    initialValues: {
      searchName,
      category,
      favorites
    },
    onSubmit: ({ searchName, category, favorites }) => {
      setSearchName(searchName);
      setCategory(category);
      setFavorites(favorites);
    }
  });

  return (
    <article className={styles.products}>
      <section className={styles.filters}>
        <FormikProvider value={formik}>
          <form>
            <FormInput name="searchName" label="Search by" autocomplete="off" />
            <CategorySelect name="category" />
            <ActionButton
              text="Filtruj"
              type="submit"
              loading={formik.isSubmitting}
              onClick={formik.handleSubmit}
            />
          </form>
        </FormikProvider>
      </section>
      <section className={styles.cards}>
        {!entitiesLoading && !entities}
      </section>
    </article>
  );
};
