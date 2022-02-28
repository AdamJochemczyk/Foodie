import React from "react";
import { ActionButton } from "../../../common/ActionButton/ActionButton";
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
              category: product[0].category,
              name: product[0].name,
              gtin_code: product[0].gtin_code,
              photo: null
            }}
          />
          <div className={styles.wrapper}>
            <p className={styles.subtitle}>Podgląd wygladu:</p>
            <div className={styles.content}>
              <ProductCard
                name={product[0].name}
                photo_link={product[0].photo_link}
                category={product[0].category}
              />
              <p className={styles.person}>
                Zgloszone przez: {product[0].users.email}
              </p>
              <ActionButton
                variant="danger"
                text="usuń produkt"
                onClick={() =>
                  removeProductMutation.mutate({
                    id: product[0].product_id,
                    gtin_code: product[0].gtin_code
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
