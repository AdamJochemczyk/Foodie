import React from "react";
import { definitions } from "types/supabase";
import { RecipeCard } from "../RecipeCard/RecipeCard";

export const RecipesCards = ({
  entities,
  withEditLink = false
}: {
  entities: definitions["recipes"][];
  withEditLink?: boolean;
}) => {
  return (
    <>
      {entities.length > 0 &&
        entities.map(
          ({
            title,
            recipeid,
            photolink,
            mealportions,
            kcalperportion,
            isvegetarian,
            isvegan,
            description,
            recipetype,
            //@ts-ignore
            isFav
          }) => (
            <RecipeCard
              key={recipeid}
              photoLink={photolink}
              title={title}
              description={description}
              recipeType={recipetype}
              mealPortions={mealportions}
              kcalPerPortions={kcalperportion}
              isVegan={isvegan}
              isVegetarian={isvegetarian}
              recipeId={recipeid}
              isUserFav={
                typeof isFav === "undefined" ? false : isFav.length > 0
              }
              href={
                withEditLink
                  ? `/recipes/${recipeid}`
                  : `/recipes/edit/${recipeid}`
              }
              btnText="Szczegóły"
            />
          )
        )}
    </>
  );
};
