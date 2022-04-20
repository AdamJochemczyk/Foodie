import { definitions } from "./../../../../../types/supabase";
import { DraggableLocation } from "react-beautiful-dnd";

//TODO: try to remove AS in this code
//probably the worst typed of my career xD

export interface MealPlanState {
  products: Array<definitions["products"]>;
  meal: {
    id: string;
    name: string;
    type: "product" | "recipe";
    photoLink: string;
  }[];
  recipes: Array<definitions["recipes"]>;
}

type oneOfMealPlanList =
  | MealPlanState["products"]
  | MealPlanState["meal"]
  | MealPlanState["recipes"];

export const reorder = (
  list: oneOfMealPlanList,
  startIndex: number,
  endIndex: number
) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const isIngredientAlreadyPlanned = (
  destinationList: MealPlanState["meal"],
  checkedId: string
) => {
  return destinationList.some(
    mealListElement => mealListElement.id === checkedId
  );
};

export const reorderMealPlan = (
  mealIngredients: MealPlanState,
  source: DraggableLocation,
  destination: DraggableLocation
) => {
  const sourceList = [
    ...mealIngredients[source.droppableId as keyof MealPlanState]
  ];
  const destinationList = [
    ...mealIngredients[destination.droppableId as keyof MealPlanState]
  ];
  const element = sourceList[source.index];

  //moving in same list
  if (source.droppableId === destination.droppableId) {
    const reordered = reorder(
      sourceList as oneOfMealPlanList,
      source.index,
      destination.index
    );
    return { ...mealIngredients, [source.droppableId]: reordered };
  }

  //moving to different list
  //insert into next only if destination is a meal list
  if (destination.droppableId === "meal") {
    if (
      source.droppableId === "products" &&
      "name" in element &&
      "productid" in element &&
      !isIngredientAlreadyPlanned(
        destinationList as MealPlanState["meal"],
        element.productid
      )
    ) {
      destinationList.splice(destination.index, 0, {
        id: element.productid,
        type: "product",
        name: element.name,
        photoLink: element.photolink
      });
    }
    if (
      source.droppableId === "recipes" &&
      "title" in element &&
      "recipeid" in element &&
      !isIngredientAlreadyPlanned(
        destinationList as MealPlanState["meal"],
        element.recipeid
      )
    ) {
      destinationList.splice(destination.index, 0, {
        id: element.recipeid,
        type: "recipe",
        name: element.title,
        photoLink: element.photolink
      });
    }
  }

  return {
    ...mealIngredients,
    [source.droppableId]: sourceList,
    [destination.droppableId]: destinationList
  };
};
