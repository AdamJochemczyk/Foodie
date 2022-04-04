import { FormikProps, FormikProvider } from "formik";
import React from "react";
import { ActionButton } from "src/common/ActionButton/ActionButton";
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
        <ActionButton
          text="apply"
          type="submit"
          isLoading={isLoading}
          onClick={formik.handleSubmit}
        />
      </form>
    </FormikProvider>
  );
};
