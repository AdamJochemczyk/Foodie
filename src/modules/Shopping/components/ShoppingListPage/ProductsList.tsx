import React, { useMemo } from "react";
import { Table } from "src/common/Table/Table";

export const ProductsList = ({
  entities,
  isLoading
}: {
  entities: {
    id: string;
    name: string;
    count: number;
  }[];
  isLoading: boolean;
}) => {
  const tableHeaders = useMemo(
    () => ["Lp.", "In fridge", "Name", "To buy", "Action"],
    []
  );

  //TODO: after fridge will be ready
  //TODO: remove and change product to buy count
  if (entities.length === 0) {
    return <p>Brak produktów do kupienia</p>;
  }
  return (
    <Table isLoading={isLoading} headers={tableHeaders}>
      {entities.map(({ id, name, count }, index) => (
        <tr key={id}>
          <td>{index}</td>
          <td>?</td>
          <td>{name}</td>
          <td>{count}</td>
          <td>Buy button or checkbox</td>
        </tr>
      ))}
    </Table>
  );
};
