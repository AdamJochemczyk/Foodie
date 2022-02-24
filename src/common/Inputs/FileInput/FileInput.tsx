import clsx from "clsx";
import { useField, useFormikContext } from "formik";
import { upperFirst } from "../../utils/stringMethods";
import styles from "../FormInputs.module.css";

interface FileInputProperties {
  name: string;
  label: string;
}

export const FileInput = ({ name, label }: FileInputProperties) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  return (
    <>
      <label
        className={clsx(styles.fieldLabel, {
          [styles.error]: meta.touched && Boolean(meta.error)
        })}
        htmlFor={name}
      >
        {upperFirst(label)}
      </label>
      <input
        type="file"
        name={name}
        onChange={event => {
          if (event.currentTarget.files) {
            setFieldValue(field.name, event.currentTarget.files[0]);
          }
        }}
      />
      <p className={styles.errorData}>{meta.touched ? meta.error : ""}</p>
    </>
  );
};
