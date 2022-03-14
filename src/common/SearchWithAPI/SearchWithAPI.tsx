import { useFormikContext } from "formik";
import React, { useState } from "react";
import Select from "react-select";
import { debounce } from "../utils/debounce";

interface Option {
  value: string;
  label: string;
}
interface SeatchWithApiProperties {
  label: string;
  name: string;
  dataSource: (search: string) => { options: Option[]; isLoading: boolean };
}
export const SearchWithAPI = ({
  label,
  name,
  dataSource
}: SeatchWithApiProperties) => {
  const [search, setSearch] = useState("");
  const { options, isLoading } = dataSource(search);

  const { setFieldValue } = useFormikContext();

  const handleChange = (selected: Option | Option[] | null) => {
    setFieldValue(name, selected);
  };

  const onInputChange = debounce((input: string) => {
    setSearch(input);
  }, 500);

  return (
    <div>
      <Select
        id={name}
        instanceId={name}
        name={name}
        placeholder={label}
        options={options}
        onInputChange={onInputChange}
        onChange={handleChange}
        isLoading={isLoading}
      />
    </div>
  );
};
