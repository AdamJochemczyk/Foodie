import { Droppable } from "react-beautiful-dnd";
import { MealIngredient } from "../../MealIngredient/MealIngredient";
import styles from "../List.module.css";

export const MealPlan = ({
  isLoading,
  entities,
  listId
}: {
  isLoading: boolean;
  entities: {
    id: string;
    name: string;
    type: "product" | "recipe";
    photoLink: string;
  }[];
  listId: string;
}) => {
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <Droppable
      droppableId={listId}
      direction="horizontal"
      isCombineEnabled={false}
    >
      {dropProvided => (
        <div {...dropProvided.droppableProps}>
          <p className={styles.title}>Meal</p>
          <div className={styles.list} ref={dropProvided.innerRef}>
            {entities.length > 0 ? (
              entities.map(({ id, name, type, photoLink }) => (
                <MealIngredient
                  key={id}
                  link={photoLink}
                  name={name}
                  type={type}
                  manageAction="meal"
                />
              ))
            ) : (
              <p>Drag product or recipe to plan a meal</p>
            )}
            {dropProvided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};
