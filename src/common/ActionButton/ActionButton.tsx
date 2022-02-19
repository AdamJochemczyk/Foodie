import React from "react";
import { Loader } from "../Loader/Loader";
import styles from "./ActionButton.module.css";

interface ActionButtonProperties {
  text: string;
  onClick: () => void;
  loading?: boolean;
  type?: "submit" | "button";
}

export const ActionButton = ({
  text,
  onClick,
  loading = false,
  type = "button"
}: ActionButtonProperties) => {
  return (
    <button className={styles.button} onClick={onClick} type={type}>
      {loading && <Loader />}
      {text}
    </button>
  );
};
