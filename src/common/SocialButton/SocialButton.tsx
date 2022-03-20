import Image from "next/image";
import React from "react";
import { LinkWrapper } from "../LinkWrapper/LinkWrapper";
import styles from "./SocialButton.module.css";

interface SocialButtonProperties {
  link: string;
  imageSrc: string;
  text: string;
}

export const SocialButton = ({
  link,
  imageSrc,
  text
}: SocialButtonProperties) => {
  return (
    <LinkWrapper link={link}>
      <div className={styles.socialButton}>
        <Image width={24} height={24} src={imageSrc} alt="icon" />
        <p className={styles.socialName}>{text}</p>
      </div>
    </LinkWrapper>
  );
};
