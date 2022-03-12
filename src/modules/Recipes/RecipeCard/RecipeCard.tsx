import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FavButton } from "../../../common/FavButton/FavButton";
import { Tag } from "../../../common/Tag/Tag";
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
          <div className={styles.imgBox}>
            <Image
              src={photoLink}
              objectFit="cover"
              layout="fill"
              alt={title}
            />
          </div>
          <div className={styles.desc}>
            <h2 className={styles.title}>{upperFirst(title)}</h2>
            <p className={styles.text}>
              {upperFirst(description.substring(0, 100)) + "..."}
            </p>
            <div className={styles.params}>
              <Tag name={recipeType} />
              <Tag name={`${mealPortions} porcji`} />
              <Tag name={`${kcalPerPortions} kcal`} />
              {isVegan ? <Tag name="wegańskie" /> : null}
              {isVegetarian ? <Tag name="wegetariańskie" /> : null}
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
