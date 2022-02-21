import Image from "next/image";
import Link from "next/link";
import React from "react";
import { OrangeButton } from "../src/common/OrangeButton/OrangeButton";
import styles from "../styles/common.module.css";

export default function Custom404() {
  return (
    <div className={styles.wrapper}>
      <Image src="/static/images/404.svg" alt="404" width={600} height={600} />
      <Link href="/" passHref>
        <a>
          <OrangeButton text="back to page" />
        </a>
      </Link>
    </div>
  );
}
