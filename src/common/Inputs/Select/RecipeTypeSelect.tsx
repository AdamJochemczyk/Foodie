import React from "react";
import { recipeTypes } from "./recipeType";
import { Select } from "./Select";
export const RecipeTypeSelect = ({ name }: { name: string }) => {
  return <Select options={recipeTypes} name={name} label="Typ przepisu" />;
};
