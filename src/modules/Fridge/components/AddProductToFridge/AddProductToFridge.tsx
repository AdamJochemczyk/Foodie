import { FormikProvider, useFormik } from "formik";
import React from "react";
import { FormInput, SearchWithAPI } from "src/common/Inputs";
import { useFindProductByName } from "src/modules/Products/hooks";
import { sub } from "date-fns";
import * as yup from "yup";
import { Button } from "src/common/Button/Button";
import { useAddProductToFridge } from "../../hooks/useAddProductToFridge";

export const AddProductToFridge = () => {
  const addProductToFridgeMutation = useAddProductToFridge();

  const formik = useFormik({
    initialValues: {
      product: { value: "", label: "" },
      count: 1,
      bestbeforedate: new Date().toISOString().split("T")[0]
    },
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      product: yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required()
      }),
      count: yup
        .number()
        .min(1, "Cannot be less than 1")
        .required("Count is required"),
      bestbeforedate: yup
        .date()
        .required("Best before date is required")
        .min(sub(new Date(), { days: 1 }), "Cannot be earlier than today")
    }),
    onSubmit: ({ product, count, bestbeforedate }) => {
      addProductToFridgeMutation.mutate({
        productid: product.value,
        count,
        bestbeforedate
      });
    }
  });

  return (
    <div>
      <FormikProvider value={formik}>
        <form>
          <SearchWithAPI
            name="product"
            label="Find product"
            dataSource={useFindProductByName}
          />
          <FormInput name="count" label="count" type="number" />
          <FormInput name="bestbeforedate" label="bestbeforedate" type="date" />
          <Button
            text="add"
            type="submit"
            onClick={formik.handleSubmit}
            size="small"
          />
        </form>
      </FormikProvider>
    </div>
  );
};
