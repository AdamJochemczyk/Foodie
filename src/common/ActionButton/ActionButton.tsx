import clsx from "clsx";
import React from "react";
import { Loader } from "../Loader/Loader";
import styles from "./ActionButton.module.css";

interface ActionButtonProperties {
  text: string;
  onClick: () => void;
  loading?: boolean;
  type?: "submit" | "button";
  rounded?: boolean;
}

export const ActionButton = ({
  text,
  onClick,
  loading = false,
  type = "button",
  rounded = false
}: ActionButtonProperties) => {
  return (
    <button
      className={clsx(styles.button, {
        [styles.rounded]: rounded
      })}
      onClick={onClick}
      type={type}
    >
      {loading && <Loader />}
      {text}
    </button>
  );
};
