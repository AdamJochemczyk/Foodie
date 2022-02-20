import { useField, useFormikContext } from "formik";
import React from "react";
import styles from "../FormInputs.module.css";

interface SelectProperties {
  options: { value: string; text: string }[];
  name: string;
  label: string;
}

export const Select = ({ options, name, label }: SelectProperties) => {
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFieldValue(name, event.target.value);
  };

  return (
    <div className={styles.field}>
      <label htmlFor={name} className={styles.fieldLabel}>
        {label}
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
    </div>
  );
};
