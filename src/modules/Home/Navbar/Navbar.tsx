import Image from "next/image";
import Link from "next/link";
import React from "react";
import { OrangeButton } from "src/common/OrangeButton/OrangeButton";
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
      <Link href="#przepisy" passHref>
        <a>Przepisy</a>
      </Link>
      <Link href="#dieta" passHref>
        <a>Dieta</a>
      </Link>
      <Link href="#lodowka" passHref>
        <a>Lodówka</a>
      </Link>
      <Link href="#zakupy" passHref>
        <a>Zakupy</a>
      </Link>
      <Link href="#raporty" passHref>
        <a>Raporty</a>
      </Link>
      <Link href="#opinie" passHref>
        <a>Opinie</a>
      </Link>
    </div>
    <div className={styles.actionBtns}>
      <Link href="/auth/sign-up" passHref>
        <a>
          <OrangeButton text="zarejestruj się" size="small" />
        </a>
      </Link>
      <Link href="/auth/sign-in" passHref>
        <a>
          <OrangeButton variant="secondary" text="zaloguj się" size="small" />
        </a>
      </Link>
    </div>
  </nav>
);
