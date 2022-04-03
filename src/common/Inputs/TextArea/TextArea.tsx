import clsx from "clsx";
import { useField } from "formik";
import { FormLabel } from "../FormLabel/FormLabel";
import styles from "../FormInputs.module.css";
import { upperFirst } from "../../utils/stringMethods";

interface TextAreaProperties {
  name: string;
  label: string;
}
export const TextArea = ({ name, label }: TextAreaProperties) => {
  const [field, meta] = useField(name);

  return (
    <div className={styles.field}>
      <FormLabel name={name} label={label} />
      <textarea
        className={clsx(styles.fieldInput, {
          [styles.error]: meta.touched && Boolean(meta.error)
        })}
        id={field.name}
        name={field.name}
        value={field?.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        rows={10}
        cols={70}
        maxLength={700}
        placeholder={upperFirst(label)}
      />
      <p className={styles.errorData}>{meta.touched ? meta.error : ""}</p>
    </div>
  );
};
