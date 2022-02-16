import React from "react";
import { Loader } from "../Loader/Loader";
import styles from "./ActionButton.module.css";

interface ActionButtonProperties {
  text: string;
  onClick: () => void;
  loading?: boolean;
}

export const ActionButton = ({
  text,
  onClick,
  loading = false
}: ActionButtonProperties) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {loading && <Loader />}
      {text}
    </button>
  );
};
