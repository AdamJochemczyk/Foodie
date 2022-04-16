import clsx from "clsx";
import React from "react";
import { Loader } from "../Loader/Loader";
import { upperFirst } from "../utils/stringMethods";
import styles from "./Button.module.css";

interface ButtonProperties {
  text: string;
  onClick?: () => void;
  isLoading?: boolean;
  type?: "submit" | "button";
  rounded?: boolean;
  variant?: "danger" | "action" | "primary" | "secondary";
  size?: "big" | "small";
  color?: "blue" | "orange";
}

export const Button = ({
  text,
  onClick,
  isLoading = false,
  type = "button",
  rounded = false,
  variant = "action",
  color = "blue",
  size = "big"
}: ButtonProperties) => {
  return (
    <button
      className={clsx(styles.button, {
        [styles.rounded]: rounded,
        [styles.orange]: color === "orange",
        [styles.danger]: variant === "danger",
        [styles.disabled]: isLoading,
        [styles.primary]: variant === "primary",
        [styles.secondary]: variant === "secondary",
        [styles.small]: size === "small",
        [styles.big]: size === "big"
      })}
      onClick={onClick}
      type={type}
      disabled={isLoading}
    >
      {isLoading ? <Loader size="small" /> : upperFirst(text)}
    </button>
  );
};
