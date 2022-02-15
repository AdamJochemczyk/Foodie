import React from "react";
import styles from "./ActionButton.module.css";

interface ActionButtonProperties {
  text: string;
  onClick: () => void;
}

export const ActionButton = ({ text, onClick }: ActionButtonProperties) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
};
