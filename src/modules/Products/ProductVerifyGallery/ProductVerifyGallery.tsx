import Link from "next/link";
import React from "react";
import { VerifyGallery } from "../../../common/VerifyGallery/VerifyGallery";
import { useSearchProducts } from "../hooks/useSearchProducts";
import { ProductCard } from "../ProductCard/ProductCard";

export const ProductVerifyGallery = () => {
  const { entities, isLoading } = useSearchProducts(
    { searchName: "", category: "", favorites: false },
    false
  );

  return (
    <VerifyGallery title="Produkty do weryfikacji" isLoading={isLoading}>
      {entities.length > 0 ? (
        entities.map(({ product_id, category, name, photo_link }) => {
          return (
            <Link
              key={product_id}
              href={`/products/verify/${product_id}`}
              passHref
            >
              <a>
                <ProductCard
                  id={product_id}
                  name={name}
                  category={category}
                  photo_link={photo_link}
                />
              </a>
            </Link>
          );
        })
      ) : (
        <p>Wszystkie produkty są zweryfikowane</p>
      )}
    </VerifyGallery>
  );
};
