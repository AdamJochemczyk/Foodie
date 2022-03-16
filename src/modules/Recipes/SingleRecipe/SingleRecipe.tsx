import Image from "next/image";
import React from "react";
import { definitions } from "../../../../types/supabase";
import { Tag } from "../../../common/Tag/Tag";
import { useFindIngredients } from "../hooks/useFindIngredients";
import styles from "./SingleRecipe.module.css";

export const SingleRecipe = ({
  recipe
}: {
  recipe: definitions["recipes"];
}) => {
  const {
    photo_link,
    title,
    description,
    recipe_type,
    kcal_per_portion,
    meal_portions,
    isvegan,
    isvegetarian
  } = recipe;

  const { ingredients, isLoading } = useFindIngredients();

  return (
    <article className={styles.container}>
      <section className={styles.card}>
        <div className={styles.imageBox}>
          <Image src={photo_link} alt={title} objectFit="cover" layout="fill" />
        </div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.recipeInfo}>
          Kcal per portion: {kcal_per_portion} | Portions: {meal_portions}
        </p>
        <p>
          {isvegan ? <Tag name="wegańskie" /> : null}
          {isvegetarian ? <Tag name="wegetariańskie" /> : null}
          <Tag name={recipe_type} />
        </p>
        <div className={styles.descBox}>
          <div className={styles.descIngredients}>
            <h3 className={styles.subTitle}>Składniki</h3>
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
            <h3 className={styles.subTitle}>Przygotowanie</h3>
            <p>{description}</p>
          </div>
        </div>
      </section>
    </article>
  );
};
