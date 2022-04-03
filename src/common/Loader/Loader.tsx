import React from "react";
import styles from "./Loader.module.css";
import clsx from "clsx";

export const Loader = ({ size }: { size: "small" | "large" }) => {
  return (
    <div
      className={clsx(styles.ldsRipple, {
        [styles.small]: size === "small",
        [styles.large]: size === "large"
      })}
    >
      <div
        className={clsx(styles.ldsRippleDivs, {
          [styles.ldsRippleDivsS]: size === "small",
          [styles.ldsRippleDivsL]: size === "large"
        })}
      ></div>
      <div
        className={clsx(styles.ldsRippleDivs, styles.ldsRippleDivLast, {
          [styles.ldsRippleDivsS]: size === "small",
          [styles.ldsRippleDivsL]: size === "large"
        })}
      ></div>
    </div>
  );
};
