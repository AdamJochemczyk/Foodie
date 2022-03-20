import Image from "next/image";
import React from "react";
import { FavButton } from "src/common/FavButton/FavButton";
import { useAddToFavProduct } from "../hooks/useAddToFavProduct";
import { useRemoveFavProduct } from "../hooks/useRemoveFavProduct";
import { ProductCardProperties } from "../types";
import styles from "./ProductCard.module.css";

export const ProductCard = ({
  photoLink,
  name,
  category,
  productId,
  isUserFav,
  showFavButton = true
}: ProductCardProperties) => {
  const addToFav = useAddToFavProduct();
  const removeFromFav = useRemoveFavProduct();

  return (
    <div className={styles.card}>
      <div className={styles.imgBox}>
        <Image layout="fill" objectFit="cover" src={photoLink} alt={name} />
      </div>
      <div className={styles.cardDesc}>
        <p className={styles.name}>{name}</p>
        <p>Category: {category}</p>
      </div>
      {showFavButton ? (
        <FavButton
          isUserFav={typeof isUserFav === "undefined" ? false : isUserFav}
          removeFromFav={() => removeFromFav.mutate(productId)}
          addToFav={() => addToFav.mutate(productId)}
        />
      ) : null}
    </div>
  );
};
