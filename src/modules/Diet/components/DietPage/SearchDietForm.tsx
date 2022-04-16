import { FormikProps, FormikProvider } from "formik";
import React from "react";
import { Button } from "src/common/Button/Button";
import { FormInput } from "src/common/Inputs";
import { DietSearch } from "../../types";

export const SearchDietForm = ({
  formik,
  isLoading
}: {
  formik: FormikProps<DietSearch>;
  isLoading: boolean;
}) => {
  return (
    <FormikProvider value={formik}>
      <form>
        <FormInput name="startDate" label="start date" type="date" />
        <FormInput name="endDate" label="end date" type="date" />
        <Button
          text="apply"
          type="submit"
          isLoading={isLoading}
          onClick={formik.handleSubmit}
          size="small"
        />
      </form>
    </FormikProvider>
  );
};
