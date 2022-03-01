import Image from "next/image";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { useAddToFavProduct } from "../hooks/useAddToFavProduct";
import { useRemoveFavProduct } from "../hooks/useRemoveFavProduct";
import styles from "./ProductCard.module.css";

interface ProductCardProperties {
  photo_link: string;
  name: string;
  category: string;
  id: string;
  isUserFav?: boolean;
}

export const ProductCard = ({
  photo_link,
  name,
  category,
  id,
  isUserFav
}: ProductCardProperties) => {
  const addToFav = useAddToFavProduct();
  const removeFromFav = useRemoveFavProduct();

  return (
    <div className={styles.card}>
      <Image height={150} width={250} src={photo_link} alt={name} />
      <div className={styles.cardDesc}>
        <p className={styles.name}>{name}</p>
        <p>Category: {category}</p>
      </div>
      {typeof isUserFav !== "undefined" ? (
        <div className={styles.heart}>
          <IconContext.Provider value={{ size: "2rem", color: "red" }}>
            {isUserFav ? (
              <AiFillHeart onClick={() => removeFromFav.mutate(id)} />
            ) : (
              <AiOutlineHeart onClick={() => addToFav.mutate(id)} />
            )}
          </IconContext.Provider>
        </div>
      ) : null}
    </div>
  );
};
