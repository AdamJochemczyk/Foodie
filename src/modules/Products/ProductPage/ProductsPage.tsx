import { FormikProvider, useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { ActionButton } from "../../../common/ActionButton/ActionButton";
import { FormInput, CategorySelect, Checkbox } from "../../../common/Inputs";
import { OrangeButton } from "../../../common/OrangeButton/OrangeButton";
import { useSearchProducts } from "../hooks/useSearchProducts";
import { ProductCard } from "../ProductCard/ProductCard";
import styles from "./ProductsPage.module.css";

export const ProductsPage = () => {
  const [queryParams, setQueryParams] = useState({
    searchName: "",
    category: "",
    favorites: false
  });

  const { entities, isLoading } = useSearchProducts(queryParams, true);

  const formik = useFormik({
    initialValues: queryParams,
    onSubmit: values => {
      setQueryParams(values);
    }
  });

  return (
    <article className={styles.products}>
      <section className={styles.filters}>
        <FormikProvider value={formik}>
          <form>
            <FormInput name="searchName" label="Search by" autocomplete="off" />
            <CategorySelect name="category" />
            <Checkbox name="favorites" label="pokaz ulubione" />
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
      </section>
      <section className={styles.cards}>
        {!isLoading && entities.length > 0 ? (
          entities.map(({ category, name, photo_link, product_id, isFav }) => (
            <ProductCard
              key={product_id}
              id={product_id}
              photo_link={photo_link}
              name={name}
              category={category}
              isUserFav={
                typeof isFav === "undefined" ? false : isFav.length > 0
              }
            />
          ))
        ) : entities.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <p>No data</p>
        )}
      </section>
    </article>
  );
};
