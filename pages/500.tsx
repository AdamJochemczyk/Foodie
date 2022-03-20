import Image from "next/image";
import React from "react";
import { LinkWrapper } from "src/common/LinkWrapper/LinkWrapper";
import { OrangeButton } from "src/common/OrangeButton/OrangeButton";
import styles from "styles/common.module.css";

export default function Custom500() {
  return (
    <div className={styles.wrapper}>
      <Image src="/static/images/500.svg" alt="500" width={600} height={600} />
      <LinkWrapper link="/">
        <OrangeButton text="back to page" />
      </LinkWrapper>
    </div>
  );
}
