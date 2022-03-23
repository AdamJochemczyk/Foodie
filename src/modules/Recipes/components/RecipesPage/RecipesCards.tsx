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
      {entities.length > 0 ? (
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
              recipetype={recipetype}
              mealportions={mealportions}
              kcalperportion={kcalperportion}
              isvegan={isvegan}
              isvegetarian={isvegetarian}
              recipeId={recipeid}
              showFavButton={!withEditLink}
              isUserFav={isFav}
              href={
                withEditLink
                  ? `/recipes/edit/${recipeid}`
                  : `/recipes/${recipeid}`
              }
              btnText="Szczegóły"
            />
          )
        )
      ) : (
        <p>Brak wyników wyszukiwania</p>
      )}
    </>
  );
};
