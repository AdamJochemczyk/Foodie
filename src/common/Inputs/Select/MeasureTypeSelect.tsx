import React from "react";
import { measureType } from "../../../constants/measureType";
import { Select } from "./Select";
export const MeasureTypeSelect = ({ name }: { name: string }) => {
  return <Select options={measureType} name={name} label="Jednostka" />;
};
