import Image from "next/image";
import React, { useCallback } from "react";
import styles from "./SignBox.module.css";
import { useRouter } from "next/router";
import { BiLeftArrowAlt } from "react-icons/bi";

interface SignBoxProperties {
  children: React.ReactNode;
  imgSrc: string;
  replaceLogoByTitle?: string;
}

export const SignBox = ({
  children,
  imgSrc,
  replaceLogoByTitle
}: SignBoxProperties) => {
  const router = useRouter();
  const handleBack = useCallback(() => {
    router.back();
  }, [router]);
  return (
    <section className={styles.box}>
      <div className={styles.left}>
        {replaceLogoByTitle ? (
          <h1 className={styles.title}>{replaceLogoByTitle}</h1>
        ) : (
          <Image
            src="/static/icons/Foodie-nav-black.svg"
            height={45}
            width={150}
            alt="Foodie"
          />
        )}
        {children}
        <p className={styles.goBack} onClick={handleBack}>
          <BiLeftArrowAlt />
          Back
        </p>
      </div>
      <div className={styles.imageBox}>
        <Image src={imgSrc} alt="people pass form" width={500} height={500} />
      </div>
    </section>
  );
};
