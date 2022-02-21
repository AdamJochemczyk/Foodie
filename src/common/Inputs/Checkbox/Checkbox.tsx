import clsx from "clsx";
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

  const handleChange = useCallback(
    (event: React.ChangeEvent<{ value: unknown }>) => {
      setFieldValue(name, event.target.value);
    },
    [name, setFieldValue]
  );

  return (
    <div className={styles.field}>
      <label className={clsx(styles.fieldLabel)} htmlFor={name}>
        {upperFirst(label)}
      </label>
      <input
        type="checkbox"
        id={field.name}
        checked={field.value}
        onChange={handleChange}
      />
    </div>
  );
};
