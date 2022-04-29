import React, { useMemo } from "react";
import { Table } from "src/common/Table/Table";
import { SingleProductOnList } from "./SingleProductOnList";

export const ProductsList = ({
  entities,
  isLoading
}: {
  entities: {
    id: string;
    name: string;
    count: number;
    countInFridge: number;
    suggestedToBuy: number;
  }[];
  isLoading: boolean;
}) => {
  const tableHeaders = useMemo(
    () => [
      "No.",
      "In fridge",
      "Name",
      "Suggested to buy",
      "Best before date",
      "Action"
    ],
    []
  );

  if (entities.length === 0) {
    return <p>Brak produktów do kupienia</p>;
  }
  return (
    <Table isLoading={isLoading} headers={tableHeaders}>
      {entities.map(({ id, name, countInFridge, suggestedToBuy }, index) => {
        return (
          <SingleProductOnList
            key={id}
            id={id}
            name={name}
            suggestedToBuy={suggestedToBuy}
            countInFridge={countInFridge}
            no={index + 1}
          />
        );
      })}
    </Table>
  );
};
