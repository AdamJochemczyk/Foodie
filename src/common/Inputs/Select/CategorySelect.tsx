import React from "react";
import { categories } from "../../../constants/categories";
import { Select } from "./Select";
export const CategorySelect = ({ name }: { name: string }) => {
  return <Select options={categories} name={name} label="Kategoria" />;
};
