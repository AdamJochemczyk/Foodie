import { FormikProvider, useFormik } from "formik";
import React from "react";
import { FormInput } from "src/common/Inputs";
import * as yup from "yup";
import styles from "./ProductInFridge.module.css";
import { Button } from "src/common/Button/Button";
import { useChangeCount } from "../../hooks/useChangeCount";
import { useRemoveProductFromFridge } from "../../hooks/useRemoveProductFromFridge";

export const ChangeProductCount = ({
  id,
  count
}: {
  id: string;
  count: number;
}) => {
  const changeCount = useChangeCount(id);
  const removeProduct = useRemoveProductFromFridge(id);

  const formik = useFormik({
    initialValues: { count },
    validationSchema: yup.object().shape({
      count: yup
        .number()
        .required("Count is required")
        .min(0, "Cannot be less than 0")
    }),
    onSubmit: ({ count }) => {
      if (count === 0) {
        removeProduct.mutate();
      } else {
        changeCount.mutate(count);
      }
    }
  });

  return (
    <FormikProvider value={formik}>
      <form>
        <div className={styles.form}>
          <FormInput type="number" name="count" label="count" />
          <Button
            size="small"
            onClick={formik.handleSubmit}
            text={`${formik.values.count === 0 ? "Delete" : "Save"}`}
            variant={`${formik.values.count === 0 ? "danger" : "action"}`}
          />
        </div>
      </form>
    </FormikProvider>
  );
};
