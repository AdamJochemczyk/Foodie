import clsx from "clsx";
import React from "react";
import styles from "./OrangeButton.module.css";

interface OrangeButtonProperties {
  text: string;
  variant?: "primary" | "secondary";
  size?: "big" | "small";
  type?: "button" | "submit";
}

export const OrangeButton = ({
  text,
  variant = "primary",
  size = "big",
  type = "button"
}: OrangeButtonProperties) => {
  return (
    <button
      type={type}
      className={clsx(styles.root, {
        [styles.primary]: variant === "primary",
        [styles.secondary]: variant === "secondary",
        [styles.small]: size === "small",
        [styles.big]: size === "big"
      })}
    >
      {text}
    </button>
  );
};
