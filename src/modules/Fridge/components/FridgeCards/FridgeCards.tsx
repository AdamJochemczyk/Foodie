import { FormikProvider, useFormik } from "formik";
import React from "react";
import { FormInput } from "src/common/Inputs";
import { useGetProductsInFridge } from "../../hooks/useGetProductsInFridge";
import { ProductInFridgeCard } from "../ProductInFridgeCard/ProductInFridgeCard";
import styles from "./FridgeCards.module.css";

export const FridgeCards = () => {
  const { entities, isLoading } = useGetProductsInFridge();

  const formik = useFormik({
    initialValues: { search: "" },
    onSubmit: () => {
      //TODO: search with pagination
      //TODO: for now filtering on FrontEnd applied
    }
  });
  if (isLoading) {
    return <p>Loding...</p>;
  }
  if (entities.length === 0) {
    return <p>You have empty fridge</p>;
  }

  return (
    <section>
      <div className={styles.search}>
        <FormikProvider value={formik}>
          <FormInput name="search" label="Search..." rounded />
        </FormikProvider>
      </div>
      <div className={styles.cards}>
        {entities
          .filter(product => {
            if (formik.values.search !== "") {
              return (
                product.name
                  .toLowerCase()
                  .indexOf(formik.values.search.toLowerCase()) !== -1
              );
            }
            return product;
          })
          .map(({ id, name, photolink, count, bestbeforedate }) => (
            <ProductInFridgeCard
              key={id}
              id={id}
              name={name}
              photolink={photolink}
              count={count}
              bestbeforedate={bestbeforedate}
            />
          ))}
      </div>
    </section>
  );
};
