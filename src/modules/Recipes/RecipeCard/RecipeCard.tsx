import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FavButton } from "src/common/FavButton/FavButton";
import { OrangeButton } from "src/common/OrangeButton/OrangeButton";
import { Tag } from "src/common/Tag/Tag";
import { upperFirst } from "src/common/utils/stringMethods";
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
  btnText: string;
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
  href,
  btnText
}: RecipeCardProperties) => {
  const addToFav = useAddToFavRecipe();
  const removeFromFav = useRemoveFavRecipe();

  return (
    <div className={styles.card}>
      <div className={styles.imgBox}>
        <Image src={photoLink} objectFit="cover" layout="fill" alt={title} />
      </div>
      <div className={styles.desc}>
        <h2 className={styles.title}>{upperFirst(title)}</h2>
        <p className={styles.text}>
          {description.length > 100
            ? upperFirst(description.substring(0, 100)) + "..."
            : description}
        </p>
        <div className={styles.params}>
          <Tag name={recipeType} />
          <Tag name={`${mealPortions} porcji`} />
          <Tag name={`${kcalPerPortions} kcal`} />
          {isVegan ? <Tag name="wegańskie" /> : null}
          {isVegetarian ? <Tag name="wegetariańskie" /> : null}
        </div>
      </div>
      <div className={styles.link}>
        <Link href={href} passHref>
          <a>
            <OrangeButton text={btnText} size="small" />
          </a>
        </Link>
      </div>

      <FavButton
        isUserFav={isUserFav}
        removeFromFav={() => removeFromFav.mutate(recipeId)}
        addToFav={() => addToFav.mutate(recipeId)}
      />
    </div>
  );
};
