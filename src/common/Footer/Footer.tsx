import React from "react";
import styles from "./Footer.module.css";
import Image from "next/image";
import { SocialButton } from "../SocialButton/SocialButton";

export const Footer = () => {
  return (
    <footer>
      <article className={styles.top}>
        <section className={styles.aboutMe}>
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
        <section>hello</section>
      </article>
      <section className={styles.bottom}>
        Copyrights CC {new Date().getFullYear()} by Adam Jochemczyk
      </section>
    </footer>
  );
};
