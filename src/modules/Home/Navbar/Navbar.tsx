import Image from "next/image";
import React from "react";
import { LinkWrapper } from "src/common/LinkWrapper/LinkWrapper";
import { Button } from "src/common/Button/Button";
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
      <LinkWrapper link="#przepisy">Przepisy</LinkWrapper>
      <LinkWrapper link="#dieta">Dieta</LinkWrapper>
      <LinkWrapper link="#lodowka">Lodówka</LinkWrapper>
      <LinkWrapper link="#zakupy">Zakupy</LinkWrapper>
      <LinkWrapper link="#raporty">Raporty</LinkWrapper>
      <LinkWrapper link="#opinie">Opinie</LinkWrapper>
    </div>
    <div className={styles.actionBtns}>
      <LinkWrapper link="/auth/sign-up">
        <Button
          text="zarejestruj się"
          size="small"
          color="orange"
          variant="primary"
        />
      </LinkWrapper>
      <LinkWrapper link="/auth/sign-in">
        <Button
          variant="secondary"
          text="zaloguj się"
          size="small"
          color="orange"
        />
      </LinkWrapper>
    </div>
  </nav>
);
