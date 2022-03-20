import { useFormik } from "formik";

import { useState } from "react";
import { CardsAndFormLayout } from "src/common/CardsAndFormLayout/CardsAndFormLayout";
import { useSearchProducts } from "../hooks/useSearchProducts";
import { SearchProducts } from "../types";
import { ProductForm } from "./ProductForm";
import { ProductCards } from "./ProductsCards";

export const ProductsPage = ({
  mode = "user"
}: {
  mode?: "user" | "admin";
}) => {
  const [queryParams, setQueryParams] = useState<SearchProducts>({
    searchName: "",
    category: "",
    favorites: false,
    verified: mode === "user"
  });

  const { entities, isLoading } = useSearchProducts(queryParams);

  const formik = useFormik<SearchProducts>({
    initialValues: { ...queryParams, verified: false },
    onSubmit: values => {
      setQueryParams(values);
    }
  });

  return (
    <CardsAndFormLayout
      title={mode === "user" ? "Produkty" : "Edytuj produkty"}
      isLoading={isLoading}
      form={<ProductForm formik={formik} changeVerified={mode === "admin"} />}
      cards={
        <ProductCards entities={entities} withEditLink={mode === "admin"} />
      }
    />
  );
};
