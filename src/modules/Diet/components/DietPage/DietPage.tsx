import React, { useState } from "react";
import { CardsAndFormLayout } from "src/common/CardsAndFormLayout/CardsAndFormLayout";
import { SearchDietForm } from "./SearchDietForm";
import { DietSearch } from "../../types";
import { useFormik } from "formik";
import { add } from "date-fns";
import { dietDatesValidation } from "../../validation";
import { DietCards } from "./DietCards";
import { getDatesBetweenDates } from "src/common/utils/getDatesBetweenDates";

export const DietPage = () => {
  const [queryParams, setQueryParams] = useState<DietSearch>({
    startDate: new Date().toISOString().split("T")[0],
    endDate: add(new Date(), { days: 7 }).toISOString().split("T")[0]
  });

  const [days, setDays] = useState<string[]>(
    getDatesBetweenDates(queryParams.startDate, queryParams.endDate)
  );

  const formik = useFormik<DietSearch>({
    initialValues: queryParams,
    validationSchema: () => dietDatesValidation(queryParams),
    onSubmit: values => {
      setQueryParams(values);
      setDays(getDatesBetweenDates(values.startDate, values.endDate));
    }
  });

  return (
    <CardsAndFormLayout
      title="Diet"
      isLoading={false}
      form={<SearchDietForm formik={formik} isLoading={false} />}
      cards={<DietCards days={days} />}
    />
  );
};
