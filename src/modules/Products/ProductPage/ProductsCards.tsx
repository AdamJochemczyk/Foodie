import Link from "next/link";
import React from "react";
import { definitions } from "types/supabase";
import { ProductCard } from "../ProductCard/ProductCard";

const LinkWrapper = ({
  productId,
  children
}: {
  productId: string;
  children: React.ReactNode;
}) => (
  <Link key={productId} href={`/products/edit/${productId}`} passHref>
    <a>{children}</a>
  </Link>
);

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
          ({ category, productname, photolink, productid, isFav }) => {
            const Card = (
              <ProductCard
                key={productid}
                productId={productid}
                name={productname}
                category={category}
                photoLink={photolink}
                isUserFav={isFav}
                showFavButton={!withEditLink}
              />
            );
            if (withEditLink) {
              return (
                <LinkWrapper key={productid} productId={productid}>
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
