import clsx from "clsx";
import React from "react";
import { Loader } from "../Loader/Loader";
import { upperFirst } from "../utils/stringMethods";
import styles from "./ActionButton.module.css";

interface ActionButtonProperties {
  text: string;
  onClick?: () => void;
  loading?: boolean;
  type?: "submit" | "button";
  rounded?: boolean;
  variant?: "danger" | "action";
}

export const ActionButton = ({
  text,
  onClick,
  loading = false,
  type = "button",
  rounded = false,
  variant = "action"
}: ActionButtonProperties) => {
  return (
    <button
      className={clsx(styles.button, {
        [styles.rounded]: rounded,
        [styles.danger]: variant === "danger"
      })}
      onClick={onClick}
      type={type}
    >
      {loading && <Loader />}
      {upperFirst(text)}
    </button>
  );
};
