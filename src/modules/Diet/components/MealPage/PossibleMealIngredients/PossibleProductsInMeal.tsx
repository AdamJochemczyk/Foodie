import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { MealIngredient } from "../../MealIngredient/MealIngredient";
import styles from "../List.module.css";

export const PossibleProductsInMeal = ({
  isLoading,
  entities,
  listId
}: {
  isLoading: boolean;
  entities: { productid: string; name: string; photolink: string }[];
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
            <p className={styles.title}>Favorite products</p>
            {entities.length > 0 ? (
              <div className={styles.list}>
                {entities.map((el, index) => (
                  <Draggable
                    key={el.productid}
                    draggableId={el.productid}
                    index={index}
                  >
                    {dragProvided => (
                      <div
                        {...dragProvided.dragHandleProps}
                        {...dragProvided.draggableProps}
                        ref={dragProvided.innerRef}
                      >
                        <MealIngredient
                          link={el.photolink}
                          name={el.name}
                          id={el.productid}
                          type="product"
                          manageAction="fav"
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {dropProvided.placeholder}
              </div>
            ) : (
              <p>You dont have favorite products yet</p>
            )}
          </div>
        </div>
      )}
    </Droppable>
  );
};
