import React from "react";
import { ActionButton } from "src/common/ActionButton/ActionButton";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import { useGetProduct } from "../hooks/useGetProduct";
import { ProductAddEdit } from "../ProductAddEdit/ProductAddEdit";
import { ProductCard } from "../ProductCard/ProductCard";
import styles from "./VerifySpecificProduct.module.css";

export const VerifySpecificProduct = () => {
  const { product, isLoading } = useGetProduct();
  const removeProductMutation = useDeleteProduct();
  return (
    <>
      {!isLoading && product ? (
        <>
          <ProductAddEdit
            mode="edit"
            initialValues={{
              category: product.category,
              name: product.name,
              gtin_code: product.gtin_code,
              photo: null
            }}
          />
          <div className={styles.wrapper}>
            <p className={styles.subtitle}>Podgląd wygladu:</p>
            <div className={styles.content}>
              <ProductCard
                id={product.product_id}
                name={product.name}
                photo_link={product.photo_link}
                category={product.category}
              />
              <p className={styles.person}>
                Zgloszone przez: {product.user.email}
              </p>
              <ActionButton
                variant="danger"
                text="usuń produkt"
                onClick={() =>
                  removeProductMutation.mutate({
                    id: product.product_id,
                    gtin_code: product.gtin_code
                  })
                }
              />
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
