import clsx from "clsx";
import { useField } from "formik";
import { upperFirst } from "../utils/stringMethods";
import styles from "./FormInput.module.css";

export const FormInput = ({
  name,
  label,
  type = "text",
  autocomplete = "off"
}: {
  name: string;
  label: string;
  autocomplete: "new-password" | "email" | "password" | "off";
  type?: "text" | "email" | "password";
}) => {
  const [field, meta] = useField(name);

  return (
    <div className={styles.field}>
      <label
        className={clsx(styles.fieldLabel, {
          [styles.error]: meta.touched && Boolean(meta.error)
        })}
        htmlFor={name}
      >
        {upperFirst(label)}
      </label>
      <input
        className={clsx(styles.fieldInput, {
          [styles.error]: meta.touched && Boolean(meta.error)
        })}
        type={type}
        id={field.name}
        name={field.name}
        value={field?.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        autoComplete={autocomplete}
      />
      <p className={styles.errorData}>{meta.touched ? meta.error : ""}</p>
    </div>
  );
};
