import React from "react";
import { CardsAndFormLayout } from "src/common/CardsAndFormLayout/CardsAndFormLayout";
import { AddProductToFridge } from "../AddProductToFridge/AddProductToFridge";
import { FridgeCards } from "../FridgeCards/FridgeCards";

export const FridgePage = () => {
  return (
    <CardsAndFormLayout
      title="Fridge"
      isLoading={false}
      form={<AddProductToFridge />}
      cards={<FridgeCards />}
    />
  );
};
