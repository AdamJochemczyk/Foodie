import Image from "next/image";
import { Button } from "src/common/Button/Button";
import { FavButton } from "src/common/FavButton/FavButton";
import { upperFirst } from "src/common/utils/stringMethods";
import { useRemoveFavProduct } from "src/modules/Products/hooks";
import { useRemoveFavRecipe } from "src/modules/Recipes/hooks";
import { useGetPhotoLinkForId } from "../../hooks/useGetPhotoLinkForId";
import { useRemoveIngredientFromMeal } from "../../hooks/useRemoveMealIngredient";
import styles from "./MealIngredient.module.css";

export const MealIngredient = ({
  link,
  name,
  type,
  manageAction,
  id
}: {
  link?: string;
  name: string;
  type: string;
  manageAction: "fav" | "meal";
  id: string;
}) => {
  // now ingredients in meal plan show only fav products
  const removeFavProduct = useRemoveFavProduct();
  const removeFavRecipe = useRemoveFavRecipe();
  const removeIngredientFromMeal = useRemoveIngredientFromMeal();

  const { photoLink, isLoading } = useGetPhotoLinkForId({ id, type });

  const handleRemoveFromFav = () => {
    if (type === "product") {
      removeFavProduct.mutate(id);
    } else if (type === "recipe") {
      removeFavRecipe.mutate(id);
    }
  };

  const handleAddToFav = () => {
    //TODO: allow user to add to fav, after allow to searching all products in meal plan page
  };

  const handleRemoveMealIngredient = () => {
    removeIngredientFromMeal.mutate({ id, type });
  };

  return (
    <div className={styles.card}>
      {manageAction === "fav" && link ? (
        <Image
          src={link}
          width={250}
          height={200}
          alt={name}
          objectFit="cover"
        />
      ) : null}
      {manageAction === "meal" && !isLoading && photoLink ? (
        <Image
          src={photoLink}
          width={250}
          height={150}
          alt={name}
          objectFit="cover"
        />
      ) : null}
      <p className={styles.title}>{upperFirst(name)}</p>
      {manageAction === "fav" ? (
        <FavButton
          isUserFav={true}
          removeFromFav={handleRemoveFromFav}
          addToFav={handleAddToFav}
        />
      ) : null}
      {manageAction === "meal" ? (
        <Button
          text="Remove ingredient"
          onClick={handleRemoveMealIngredient}
          size="small"
          color="orange"
        />
      ) : null}
    </div>
  );
};
