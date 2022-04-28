import { FormikProvider, useFormik } from "formik";
import React from "react";
import { FormInput } from "src/common/Inputs";
import { useChangeBestBeforeDate } from "../../hooks/useChangeBestBeforeDate";
import * as yup from "yup";
import { sub } from "date-fns";
import styles from "./ProductInFridge.module.css";
import { Button } from "src/common/Button/Button";
export const ChangeBestBeforeDateFrom = ({
  id,
  bestbeforedate
}: {
  id: string;
  bestbeforedate: string;
}) => {
  const changeBestBeforeDate = useChangeBestBeforeDate(id);

  const formik = useFormik({
    initialValues: { bestbeforedate },
    validationSchema: yup.object().shape({
      bestbeforedate: yup
        .date()
        .required("Best before date is required")
        .min(sub(new Date(), { days: 1 }), "Cannot be earlier than today")
    }),
    onSubmit: ({ bestbeforedate }) => {
      changeBestBeforeDate.mutate(bestbeforedate);
    }
  });

  return (
    <FormikProvider value={formik}>
      <form>
        <div className={styles.form}>
          <FormInput
            type="date"
            name="bestbeforedate"
            label="best before date"
          />
          <Button
            size="small"
            onClick={formik.handleSubmit}
            text="save"
            color="orange"
            variant="primary"
          />
        </div>
      </form>
    </FormikProvider>
  );
};
