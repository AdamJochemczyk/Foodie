import Image from "next/image";
import { upperFirst } from "src/common/utils/stringMethods";
import styles from "./MealIngredient.module.css";

export const MealIngredient = ({
  link,
  name,
  type,
  manageAction
}: {
  link: string;
  name: string;
  type: "recipe" | "product";
  manageAction: "fav" | "meal";
}) => {
  if (manageAction === "fav" && type === "product") {
    //TODO: hook to remove by id from meal
  }

  return (
    <div className={styles.card}>
      <Image
        src={link}
        width={250}
        height={200}
        alt={name}
        objectFit="contain"
      />
      <p className={styles.title}>{upperFirst(name)}</p>
    </div>
  );
};
