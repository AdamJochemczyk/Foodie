import Link from "next/link";
import React from "react";
import { useFindProductsToVerify } from "../hooks/useFindProductsToVerify";
import { ProductCard } from "../ProductCard/ProductCard";
import styles from "./ProductVerifyGallery.module.css";

export const ProductVerifyGallery = () => {
  const { entities, isLoading } = useFindProductsToVerify();

  if (isLoading) {
    <div>Loading...</div>;
  }
  return (
    <article className={styles.wrapper}>
      <h2 className={styles.title}>Produkty do weryfikacji</h2>
      <section className={styles.gallery}>
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
      </section>
    </article>
  );
};
