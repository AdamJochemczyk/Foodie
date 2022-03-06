import clsx from "clsx";
import { useField } from "formik";
import styles from "../FormInputs.module.css";
import { FormLabel } from "../FormLabel/FormLabel";

export const FormInput = ({
  name,
  label,
  type = "text",
  autocomplete = "off",
  rounded = false
}: {
  name: string;
  label: string;
  autocomplete?: "new-password" | "email" | "password" | "off";
  type?: "text" | "email" | "password" | "number";
  rounded?: boolean;
}) => {
  const [field, meta] = useField(name);

  return (
    <div className={styles.field}>
      <FormLabel name={name} label={label} meta={meta} />
      <input
        className={clsx(styles.fieldInput, {
          [styles.error]: meta.touched && Boolean(meta.error),
          [styles.rounded]: rounded
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
