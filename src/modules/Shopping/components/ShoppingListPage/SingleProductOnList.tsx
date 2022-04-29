import { addDays } from "date-fns";
import { FormikProvider, useFormik } from "formik";
import React from "react";
import { Button } from "src/common/Button/Button";
import { FormInput } from "src/common/Inputs";
import { useAddProductToFridge } from "src/modules/Fridge/hooks/useAddProductToFridge";
import * as yup from "yup";

interface SingleProductOnListProperties {
  id: string;
  suggestedToBuy: number;
  no: number;
  name: string;
  countInFridge: number;
}

export const SingleProductOnList = ({
  id,
  suggestedToBuy,
  no,
  name,
  countInFridge
}: SingleProductOnListProperties) => {
  const addProductToFridge = useAddProductToFridge();

  const formik = useFormik({
    initialValues: {
      id: id,
      count: suggestedToBuy,
      bestbeforedate: addDays(new Date(), 1).toISOString().split("T")[0]
    },
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      count: yup
        .number()
        .min(1, "Count cannot be less than 1")
        .required("Count is required"),
      bestbeforedate: yup
        .date()
        .required("Best before date is required")
        .min(new Date(), "Cannot be earlier than tomorrow")
        .required("Best before date is required")
    }),
    onSubmit: ({ id, bestbeforedate, count }) => {
      addProductToFridge.mutate({ productid: id, bestbeforedate, count });
    }
  });

  return (
    <tr key={id}>
      <td>{no}</td>
      <td>{countInFridge}</td>
      <td>{name}</td>
      <FormikProvider value={formik}>
        <td>
          <FormInput type="number" name="count" label="" />
        </td>
        <td>
          <FormInput type="date" name="bestbeforedate" label="" />
        </td>
        <td>
          <Button
            text="Add to fridge"
            onClick={formik.handleSubmit}
            size="small"
            color="orange"
          />
        </td>
      </FormikProvider>
    </tr>
  );
};
