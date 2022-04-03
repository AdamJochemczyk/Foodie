import { useField, useFormikContext } from "formik";
import React, { useState } from "react";
import Select from "react-select";
import { debounce } from "../../utils/debounce";
import styles from "../FormInputs.module.css";
import { FormLabel } from "../FormLabel/FormLabel";

interface Option {
  value: string;
  label: string;
}
interface SearchWithApiProperties {
  label: string;
  name: string;
  dataSource: (search: string) => { options: Option[]; isLoading: boolean };
}
export const SearchWithAPI = ({
  label,
  name,
  dataSource
}: SearchWithApiProperties) => {
  const [search, setSearch] = useState("");
  const { options, isLoading } = dataSource(search);
  const [field, meta] = useField(name);

  const { setFieldValue } = useFormikContext();

  const handleChange = (selected: Option | Option[] | null) => {
    setFieldValue(name, selected);
  };

  const onInputChange = debounce((input: string) => {
    setSearch(input);
  }, 500);

  return (
    <div className={styles.field}>
      <FormLabel name={name} label={label} meta={meta} />
      <Select
        id={field.name}
        instanceId={field.name}
        name={field.name}
        placeholder={label}
        options={options}
        onInputChange={onInputChange}
        onChange={handleChange}
        isLoading={isLoading}
      />
      <p className={styles.errorData}>{meta.error}</p>
    </div>
  );
};
