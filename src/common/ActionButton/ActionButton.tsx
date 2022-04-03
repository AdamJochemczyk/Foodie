import clsx from "clsx";
import React from "react";
import { Loader } from "../Loader/Loader";
import { upperFirst } from "../utils/stringMethods";
import styles from "./ActionButton.module.css";

interface ActionButtonProperties {
  text: string;
  onClick?: () => void;
  isLoading: boolean;
  type?: "submit" | "button";
  rounded?: boolean;
  variant?: "danger" | "action";
}

export const ActionButton = ({
  text,
  onClick,
  isLoading,
  type = "button",
  rounded = false,
  variant = "action"
}: ActionButtonProperties) => {
  return (
    <button
      className={clsx(styles.button, {
        [styles.rounded]: rounded,
        [styles.danger]: variant === "danger",
        [styles.disabled]: isLoading
      })}
      onClick={onClick}
      type={type}
      disabled={isLoading}
    >
      {isLoading ? <Loader size="small" /> : upperFirst(text)}
    </button>
  );
};
