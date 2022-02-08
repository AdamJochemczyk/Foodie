import Image from "next/image";
import Link from "next/link";
import React from "react";
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
    <Link href={link} passHref={true}>
      <div className={styles.socialButton}>
        <Image width={24} height={24} src={imageSrc} alt="icon" />
        <p className={styles.socialName}>{text}</p>
      </div>
    </Link>
  );
};
