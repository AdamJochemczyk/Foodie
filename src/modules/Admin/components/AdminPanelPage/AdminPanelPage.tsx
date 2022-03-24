import React from "react";

export interface Counts {
  productCount: number;
  recipesCount: number;
  usersCount: number;
}

export const AdminPanelPage = ({ data }: { data: Counts }) => {
  return (
    <div>
      <p>Product count: {data.productCount}</p>
      <p>Recipes count: {data.recipesCount}</p>
      <p>Users count: {data.usersCount}</p>
    </div>
  );
};
