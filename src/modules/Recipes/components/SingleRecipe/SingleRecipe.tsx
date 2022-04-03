import Image from "next/image";
import React from "react";
import { definitions } from "types/supabase";
import { Tag } from "src/common/Tag/Tag";
import { useFindIngredients } from "../../hooks/useFindIngredients";
import styles from "./SingleRecipe.module.css";

export const SingleRecipe = ({
  recipe
}: {
  recipe: definitions["recipes"];
}) => {
  const {
    photolink,
    title,
    description,
    recipetype,
    kcalperportion,
    mealportions,
    isvegan,
    isvegetarian
  } = recipe;

  const { ingredients, isLoading } = useFindIngredients();

  return (
    <article className={styles.container}>
      <section className={styles.card}>
        <div className={styles.imageBox}>
          <Image src={photolink} alt={title} objectFit="cover" layout="fill" />
        </div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.recipeInfo}>
          Kcal per portion: {kcalperportion} | Portions: {mealportions}
        </p>
        <p>
          {isvegan ? <Tag name="vegan" /> : null}
          {isvegetarian ? <Tag name="vegetarian" /> : null}
          <Tag name={recipetype} />
        </p>
        <div className={styles.descBox}>
          <div className={styles.descIngredients}>
            <h3 className={styles.subTitle}>Ingredients:</h3>
            {!isLoading ? (
              ingredients.length > 0 &&
              ingredients.map(el => (
                <p key={el.id}>
                  {el.name} {el.count}
                  {el.measure}
                </p>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <div className={styles.desc}>
            <h3 className={styles.subTitle}>Description</h3>
            <p>{description}</p>
          </div>
        </div>
      </section>
    </article>
  );
};
