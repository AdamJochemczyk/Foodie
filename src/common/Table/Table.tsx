import { ReactNode } from "react";
import styles from "./Table.module.css";

export const Table = ({
  headers,
  isLoading,
  children
}: {
  headers: string[];
  isLoading: boolean;
  children: ReactNode;
}) => {
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {headers.map(header => (
            <td key={header}>{header}</td>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};
