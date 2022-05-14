import Image from "next/image";
import React from "react";
import { FavButton } from "src/common/FavButton/FavButton";
import { LinkWrapper } from "src/common/LinkWrapper/LinkWrapper";
import { Button } from "src/common/Button/Button";
import { Tag } from "src/common/Tag/Tag";
import { upperFirst } from "src/common/utils/stringMethods";
import { useAddToFavRecipe, useRemoveFavRecipe } from "../../hooks";
import { RecipeCardProperties } from "../../types";
import styles from "./RecipeCard.module.css";

export const RecipeCard = ({
  photoLink,
  title,
  description,
  recipetype,
  mealportions,
  kcalperportion,
  isvegan,
  isvegetarian,
  isUserFav,
  recipeId,
  href,
  btnText,
  showFavButton = true
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
          <Tag name={recipetype} />
          <Tag name={`${mealportions} portions`} />
          <Tag name={`${kcalperportion} kcal`} />
          {isvegan ? <Tag name="wegańskie" /> : null}
          {isvegetarian ? <Tag name="wegetariańskie" /> : null}
        </div>
      </div>
      <div className={styles.link}>
        <LinkWrapper link={href}>
          <Button
            text={btnText}
            size="small"
            color="orange"
            variant="primary"
          />
        </LinkWrapper>
      </div>

      {showFavButton ? (
        <FavButton
          isUserFav={
            typeof isUserFav === "undefined" ? false : isUserFav.length > 0
          }
          removeFromFav={() => removeFromFav.mutate(recipeId)}
          addToFav={() => addToFav.mutate(recipeId)}
        />
      ) : null}
    </div>
  );
};
