import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FavButton } from "../../../common/FavButton/FavButton";
import { upperFirst } from "../../../common/utils/stringMethods";
import { useAddToFavRecipe } from "../hooks/useAddToFavRecipe";
import { useRemoveFavRecipe } from "../hooks/useRemoveFromFavRecipe";
import styles from "./RecipeCard.module.css";

interface RecipeCardProperties {
  photoLink: string;
  title: string;
  description: string;
  recipeType: string;
  mealPortions: number;
  kcalPerPortions: number;
  isVegan: boolean;
  isVegetarian: boolean;
  recipeId: string;
  isUserFav?: boolean;
  href: string;
}

export const RecipeCard = ({
  photoLink,
  title,
  description,
  recipeType,
  mealPortions,
  kcalPerPortions,
  isVegan,
  isVegetarian,
  isUserFav,
  recipeId,
  href
}: RecipeCardProperties) => {
  const addToFav = useAddToFavRecipe();
  const removeFromFav = useRemoveFavRecipe();

  return (
    <div className={styles.card}>
      <Link href={href} passHref>
        <a>
          <Image src={photoLink} height={200} width={300} alt={title} />
          <div className={styles.desc}>
            <h2 className={styles.title}>{upperFirst(title)}</h2>
            <p className={styles.text}>
              {upperFirst(description.substring(0, 100)) + "..."}
            </p>
            <div className={styles.params}>
              <p>Recipe type: {recipeType}</p>
              <p>Portions: {mealPortions}</p>
              <p>Portion kcal: {kcalPerPortions}</p>
              {isVegan ? <p>Vegan</p> : null}
              {isVegetarian ? <p>Vegetarian</p> : null}
            </div>
          </div>
        </a>
      </Link>
      <FavButton
        isUserFav={isUserFav}
        removeFromFav={() => removeFromFav.mutate(recipeId)}
        addToFav={() => addToFav.mutate(recipeId)}
      />
    </div>
  );
};
