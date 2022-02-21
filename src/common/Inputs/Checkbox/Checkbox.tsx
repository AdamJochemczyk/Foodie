import { useField, useFormikContext } from "formik";
import { useCallback } from "react";
import { upperFirst } from "../../utils/stringMethods";
import styles from "../FormInputs.module.css";

interface CheckboxProperties {
  label: string;
  name: string;
}

export const Checkbox = ({ label, name }: CheckboxProperties) => {
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = useCallback(() => {
    setFieldValue(name, !field.value);
  }, [setFieldValue, name, field.value]);

  return (
    <div className={styles.checkbox}>
      <input
        type="checkbox"
        id={field.name}
        checked={field.value}
        onChange={handleChange}
      />
      <label htmlFor={name}>{upperFirst(label)}</label>
    </div>
  );
};
