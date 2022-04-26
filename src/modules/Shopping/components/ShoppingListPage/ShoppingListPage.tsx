import { add } from "date-fns";
import { useFormik } from "formik";
import React, { useState } from "react";
import { CardsAndFormLayout } from "src/common/CardsAndFormLayout/CardsAndFormLayout";
import { DietSearch } from "src/modules/Diet/types";
import { dietDatesValidation } from "src/modules/Diet/validation";
import { useGetShoppingList } from "../../hooks/useGetShoppingList";
import { GenerateListForm } from "./GenerateListForm";
import { ProductsList } from "./ProductsList";

export const ShoppingListPage = () => {
  const [queryParams, setQueryParams] = useState<DietSearch>({
    startDate: new Date().toISOString().split("T")[0],
    endDate: add(new Date(), { days: 5 }).toISOString().split("T")[0]
  });
  const { entities, isLoading } = useGetShoppingList(queryParams);

  const formik = useFormik<DietSearch>({
    initialValues: queryParams,
    validationSchema: () => dietDatesValidation(queryParams),
    onSubmit: values => {
      setQueryParams(values);
    }
  });

  return (
    <CardsAndFormLayout
      title="Shopping list"
      isLoading={isLoading}
      form={<GenerateListForm formik={formik} isLoading={isLoading} />}
      cards={<ProductsList entities={entities} isLoading={isLoading} />}
    />
  );
};
