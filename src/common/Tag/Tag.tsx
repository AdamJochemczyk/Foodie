import React from "react";
import styles from "./Tag.module.css";

export const Tag = ({ name }: { name: string }) => {
  return <span className={styles.tag}>{name}</span>;
};
