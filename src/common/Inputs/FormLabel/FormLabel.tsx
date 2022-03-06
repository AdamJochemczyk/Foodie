import clsx from "clsx";
import { FieldMetaProps } from "formik";
import React from "react";
import { upperFirst } from "../../utils/stringMethods";
import styles from "../FormInputs.module.css";

export const FormLabel = ({
  name,
  label,
  meta,
  children
}: {
  name: string;
  label: string;
  meta?: FieldMetaProps<unknown>;
  children?: React.ReactNode;
}) => {
  return (
    <label
      className={clsx(styles.fieldLabel, {
        [styles.error]: meta?.touched && Boolean(meta?.error)
      })}
      htmlFor={name}
    >
      {upperFirst(label)}
      {children}
    </label>
  );
};
