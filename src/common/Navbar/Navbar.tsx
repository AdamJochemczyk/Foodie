import Image from "next/image";
import Link from "next/link";
import React from "react";
import { OrangeButton } from "../OrangeButton/OrangeButton";
import styles from "./Navbar.module.css";

export const Navbar = () => (
  <nav className={styles.navbar}>
    <Image
      src="/static/icons/Foodie-nav.svg"
      height={24}
      width={130}
      alt="Foodie"
    />
    <div className={styles.menuItems}>
      <Link href="#first-section" passHref>
        <a>Przepisy</a>
      </Link>
      <Link href="#first-section" passHref>
        <a>Dieta</a>
      </Link>
      <Link href="#first-section" passHref>
        <a>Lodówka</a>
      </Link>
      <Link href="#first-section" passHref>
        <a>Zakupy</a>
      </Link>
      <Link href="#first-section" passHref>
        <a>Raporty</a>
      </Link>
      <Link href="#first-section" passHref>
        <a>Opinie</a>
      </Link>
    </div>
    <div className={styles.actionBtns}>
      <OrangeButton text="zarejsetruj się" size="small" />
      <OrangeButton variant="secondary" text="zaloguj się" size="small" />
    </div>
  </nav>
);
