import Image from "next/image";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import styles from "./ProductCard.module.css";

interface ProductCardProperties {
  photo_link: string;
  name: string;
  category: string;
}

export const ProductCard = ({
  photo_link,
  name,
  category
}: ProductCardProperties) => {
  return (
    <div className={styles.card}>
      <Image height={150} width={250} src={photo_link} alt={name} />
      <div className={styles.cardDesc}>
        <p className={styles.name}>{name}</p>
        <p>Category: {category}</p>
      </div>
      <div className={styles.heart}>
        <IconContext.Provider value={{ size: "2rem" }}>
          {/* TODO: when we have table AiFillHeart */}
          <AiOutlineHeart />
        </IconContext.Provider>
      </div>
    </div>
  );
};
