import clsx from "clsx";
import { useField, useFormikContext } from "formik";
import React, { useCallback } from "react";
import styles from "../FormInputs.module.css";
import { FormLabel } from "../FormLabel/FormLabel";

interface SelectProperties {
  options: { value: string; text: string }[];
  name: string;
  label: string;
}

export const Select = ({ options, name, label }: SelectProperties) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      setFieldValue(name, event.target.value);
    },
    [name, setFieldValue]
  );

  return (
    <div className={styles.field}>
      <FormLabel name={name} label={label} meta={meta} />
      <select
        className={clsx(styles.fieldInput, {
          [styles.error]: meta.touched && Boolean(meta.error)
        })}
        name={field.name}
        id={field.name}
        onChange={handleChange}
        onBlur={field.onBlur}
        defaultValue="default"
      >
        <option value="default" />
        {options.map(({ value, text }) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
      <p className={styles.errorData}>{meta.touched ? meta.error : ""}</p>
    </div>
  );
};
