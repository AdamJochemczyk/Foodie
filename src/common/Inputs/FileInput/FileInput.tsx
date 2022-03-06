import { useField, useFormikContext } from "formik";
import { useState } from "react";
import styles from "../FormInputs.module.css";
import { FormLabel } from "../FormLabel/FormLabel";
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
      <FormLabel name="file" label={label} meta={meta}>
        <p className={fileInput.fileName}>
          {fileName} {fileSize}
        </p>
      </FormLabel>
      <p className={styles.errorData}>{meta.touched ? meta.error : ""}</p>
    </div>
  );
};
