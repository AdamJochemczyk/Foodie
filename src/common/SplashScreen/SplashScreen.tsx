import React from "react";
import { Loader } from "../Loader/Loader";
import styles from "./SplashScreen.module.css";

export const SplashScreen = () => (
  <div className={styles.wrapper}>
    <Loader size="large" />
  </div>
);
