import clsx from "clsx";
import { useField, useFormikContext } from "formik";
import { useState } from "react";
import { upperFirst } from "../../utils/stringMethods";
import styles from "../FormInputs.module.css";
import fileInput from "./FileInput.module.css";

interface FileInputProperties {
  name: string;
  label: string;
}

export const FileInput = ({ name, label }: FileInputProperties) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");

  return (
    <div className={fileInput.fileInput}>
      <input
        type="file"
        id="file"
        className={fileInput.file}
        onChange={event => {
          if (event.currentTarget.files) {
            setFieldValue(field.name, event.currentTarget.files[0]);
            setFileName(event.currentTarget.files[0].name);
            setFileSize(
              `${(event.currentTarget.files[0].size / 1000).toFixed(2)}KB`
            );
          }
        }}
      />
      <label
        htmlFor="file"
        className={clsx(styles.fieldLabel, {
          [styles.error]: meta.touched && Boolean(meta.error)
        })}
      >
        {upperFirst(label)}
        <p className={fileInput.fileName}>
          {fileName} {fileSize}
        </p>
      </label>
      <p className={styles.errorData}>{meta.touched ? meta.error : ""}</p>
    </div>
  );
};
