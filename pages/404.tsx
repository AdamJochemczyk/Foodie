import Image from "next/image";
import React from "react";
import { LinkWrapper } from "src/common/LinkWrapper/LinkWrapper";
import { Button } from "src/common/Button/Button";
import styles from "styles/common.module.css";

export default function Custom404() {
  return (
    <div className={styles.wrapper}>
      <Image src="/static/images/404.svg" alt="404" width={600} height={600} />
      <LinkWrapper link="/">
        <Button text="back to page" color="orange" variant="primary" />
      </LinkWrapper>
    </div>
  );
}
