import { useField, useFormikContext } from "formik";
import { useState } from "react";
import styles from "../FormInputs.module.css";
import { FormLabel } from "../FormLabel/FormLabel";
import fileInput from "./FileInput.module.css";
import { CropEasy } from "./crop/CropEasy";
import Image from "next/image";
import { Button } from "src/common/Button/Button";

interface FileInputProperties {
  name: string;
  label: string;
  showAfterCrop?: boolean;
}

export const FileInput = ({
  name,
  label,
  showAfterCrop = true
}: FileInputProperties) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const [openCrop, setOpenCrop] = useState(false);
  const [photoURL, setPhotoUrl] = useState("");

  const setFile = (file: File | Blob) => {
    setFieldValue(field.name, file);
  };
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      const file = event.currentTarget.files[0];
      setFile(file);
      setPhotoUrl(URL.createObjectURL(file));
      setOpenCrop(true);
    }
  };
  const handleEditAgain = () => {
    setOpenCrop(true);
  };

  return (
    <div className={fileInput.fileInput}>
      {openCrop ? (
        <CropEasy
          photoURL={photoURL}
          setPhotoURL={setPhotoUrl}
          setOpenCrop={setOpenCrop}
          setFile={setFile}
        />
      ) : (
        <>
          {photoURL && showAfterCrop ? (
            <div className={fileInput.imgPreview}>
              <Image src={photoURL} alt="No image" layout="fill" />
            </div>
          ) : null}
          <input
            type="file"
            id="file"
            className={fileInput.file}
            onChange={onFileChange}
          />
          <div className={fileInput.buttons}>
            {photoURL ? (
              <Button
                text="Edit again"
                onClick={handleEditAgain}
                variant="secondary"
                size="small"
                color="orange"
              />
            ) : null}
            <FormLabel name="file" label={label} meta={meta} />
          </div>
        </>
      )}
      <p className={styles.errorData}>{meta.touched ? meta.error : ""}</p>
    </div>
  );
};
