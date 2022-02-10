import React from "react";
import styles from "./Footer.module.css";
import Image from "next/image";
import { SocialButton } from "../SocialButton/SocialButton";
import { OrangeButton } from "../OrangeButton/OrangeButton";

export const Footer = () => {
  return (
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
            <SocialButton
              link="https://www.facebook.com/adam.jochemczyk.9"
              imageSrc="/static/icons/facebook.svg"
              text="facebook"
            />
            <SocialButton
              link="https://github.com/AdamJochemczyk"
              imageSrc="/static/icons/github.svg"
              text="github"
            />
            <SocialButton
              link="https://www.linkedin.com/in/adam-jochemczyk-6bb5a7204/"
              imageSrc="/static/icons/linkedin.svg"
              text="linkedin"
            />
            <SocialButton
              link="mailto:adamjoche@gmail.com"
              imageSrc="/static/icons/mail.svg"
              text="mail"
            />
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
              ></textarea>
              <OrangeButton
                text="skontaktuj się ze mną"
                variant="primary"
                type="submit"
              ></OrangeButton>
            </form>
          </div>
        </section>
      </article>
      <section className={styles.bottom}>
        Copyrights CC {new Date().getFullYear()} by Adam Jochemczyk
      </section>
    </footer>
  );
};
