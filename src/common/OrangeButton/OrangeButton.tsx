import clsx from "clsx";
import React from "react";
import styles from "./OrangeButton.module.css";

interface OrangeButtonProperties {
  text: string;
  variant: "primary" | "secondary";
  type?: "button" | "submit";
}

export const OrangeButton = ({
  text,
  variant,
  type
}: OrangeButtonProperties) => {
  return (
    <button
      type={type || "button"}
      className={clsx(styles.root, {
        [styles.primary]: variant === "primary",
        [styles.secondary]: variant === "secondary"
      })}
    >
      {text}
    </button>
  );
};
