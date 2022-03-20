import React from "react";
import styles from "./Footer.module.css";
import Image from "next/image";
import { SocialButton } from "src/common/SocialButton/SocialButton";
import { OrangeButton } from "src/common/OrangeButton/OrangeButton";
import { socials } from "../constants";
import { LinkWrapper } from "src/common/LinkWrapper/LinkWrapper";

export const Footer = () => (
  <footer>
    <article className={styles.top}>
      <section className={styles.footerSection}>
        <div className={styles.me}>
          <Image
            src="/static/images/me.jpg"
            height={200}
            width={200}
            alt="author"
          />
        </div>
        <h3 className={styles.name}>Adam Jochemczyk</h3>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
          accusamus velit voluptatum perferendis dignissimos dicta sapiente
          optio nesciunt nostrum porro inventore vel in qui dolor dolore
          placeat, minus officiis voluptate nemo quas magnam itaque doloremque
          veritatis.
        </p>
        <div className={styles.buttons}>
          {socials.map(({ link, src, text }) => (
            <SocialButton key={link} link={link} imageSrc={src} text={text} />
          ))}
        </div>
      </section>
      <section className={styles.footerSection}>
        <Image
          src="/static/icons/logo.svg"
          width={250}
          height={72}
          alt="logo"
        />
        <h3>Foodie sp. z o . o</h3>
        <address>
          <p>ul. Brzozowa 23</p>
          <p>Katowice</p>
          <p>Polska</p>
          <p>info@foodie.pl</p>
          <p>+48 123 456 798</p>
        </address>
        <p>
          <LinkWrapper link="https://storyset.com">
            Illustrations by Storyset
          </LinkWrapper>
        </p>
        <div>
          <form
            action="mailto:adamjoche@gmail.com"
            method="POST"
            name="contact"
            className={styles.contactForm}
          >
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              className={styles.contactForm__input}
            />
            <label htmlFor="message">Message:</label>
            <textarea
              name="message"
              rows={6}
              cols={20}
              maxLength={150}
              className={styles.contactForm__input}
            />
            <OrangeButton text="skontaktuj się ze mną" type="submit" />
          </form>
        </div>
      </section>
    </article>
    <section className={styles.bottom}>
      Copyrights CC {new Date().getFullYear()} by Adam Jochemczyk
    </section>
  </footer>
);
