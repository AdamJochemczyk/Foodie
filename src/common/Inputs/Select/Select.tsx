import { useField, useFormikContext } from "formik";
import React, { useCallback } from "react";
import { upperFirst } from "../../utils/stringMethods";
import styles from "../FormInputs.module.css";

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
      <label htmlFor={name} className={styles.fieldLabel}>
        {upperFirst(label)}
      </label>
      <select
        className={styles.fieldInput}
        name={field.name}
        id={field.name}
        value={field?.value}
        onChange={handleChange}
        onBlur={field.onBlur}
      >
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
