import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import styles from "./FavButton.module.css";

interface FavButtonProperties {
  isUserFav?: boolean;
  removeFromFav: () => void;
  addToFav: () => void;
}
export const FavButton = ({
  isUserFav,
  removeFromFav,
  addToFav
}: FavButtonProperties) => {
  if (typeof isUserFav === "boolean") {
    return (
      <div className={styles.heart}>
        <IconContext.Provider value={{ size: "2rem", color: "red" }}>
          {isUserFav ? (
            <AiFillHeart onClick={removeFromFav} />
          ) : (
            <AiOutlineHeart onClick={addToFav} />
          )}
        </IconContext.Provider>
      </div>
    );
  } else {
    return null;
  }
};
