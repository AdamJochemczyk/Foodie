import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { MealIngredient } from "../../MealIngredient/MealIngredient";
import styles from "../List.module.css";

export const PossibleRecipesInMeal = ({
  isLoading,
  entities,
  listId
}: {
  isLoading: boolean;
  entities: { recipeid: string; title: string; photolink: string }[];
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
          <div ref={dropProvided.innerRef}>
            <p className={styles.title}>Favorite recipes</p>
            {entities.length > 0 ? (
              <div className={styles.list}>
                {entities.map((el, index) => (
                  <Draggable
                    key={el.recipeid}
                    draggableId={el.recipeid}
                    index={index}
                  >
                    {dragProvided => (
                      <div
                        {...dragProvided.dragHandleProps}
                        {...dragProvided.draggableProps}
                        ref={dragProvided.innerRef}
                      >
                        <MealIngredient
                          type="recipe"
                          link={el.photolink}
                          name={el.title}
                          manageAction="fav"
                          id={el.recipeid}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {dropProvided.placeholder}
              </div>
            ) : (
              <p>You dont have favorite recipes yet</p>
            )}
          </div>
        </div>
      )}
    </Droppable>
  );
};
