import React from "react";
import { LinkWrapper } from "src/common/LinkWrapper/LinkWrapper";
import { definitions } from "types/supabase";
import { ProductCard } from "../ProductCard/ProductCard";

export const ProductCards = ({
  entities,
  withEditLink = false
}: {
  entities: definitions["products"][];
  withEditLink?: boolean;
}) => {
  return (
    <>
      {entities.length > 0 ? (
        entities.map(
          //@ts-ignore
          ({ category, name, photolink, productid, isFav }) => {
            const Card = (
              <ProductCard
                key={productid}
                productId={productid}
                name={name}
                category={category}
                photoLink={photolink}
                isUserFav={isFav}
                showFavButton={!withEditLink}
              />
            );
            if (withEditLink) {
              return (
                <LinkWrapper
                  key={productid}
                  link={`/products/edit/${productid}`}
                >
                  {Card}
                </LinkWrapper>
              );
            } else {
              return Card;
            }
          }
        )
      ) : (
        <p>Brak produktow</p>
      )}
    </>
  );
};
