/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: remove any, problem with supabase types in joins
import { useRouter } from "next/router";
import React from "react";
import { ActionButton } from "src/common/ActionButton/ActionButton";
import { useDeleteProduct } from "../hooks/useDeleteProduct";
import { useGetProduct } from "../hooks/useGetProduct";
import { ProductAddEdit } from "../ProductAddEdit/ProductAddEdit";
import { ProductCard } from "../ProductCard/ProductCard";
import styles from "./EditProduct.module.css";

export const EditProduct = () => {
  const router = useRouter();
  const { product_id } = router.query;
  const { product, isLoading } = useGetProduct(product_id);
  const removeProductMutation = useDeleteProduct();
  return (
    <>
      {!isLoading && product ? (
        <>
          <ProductAddEdit
            mode="edit"
            initialValues={{
              category: product.category,
              name: product.productname,
              gtinCode: product.gtincode.toString(),
              photo: null
            }}
          />
          <div className={styles.wrapper}>
            <p className={styles.subtitle}>Podgląd wygladu:</p>
            <div className={styles.content}>
              <ProductCard
                productId={product.productid}
                name={product.productname}
                photoLink={product.photolink}
                category={product.category}
                showFavButton={false}
              />
              <p className={styles.person}>
                Zgloszone przez: {(product as any).user.email}
              </p>
              <ActionButton
                variant="danger"
                text="usuń produkt"
                onClick={() =>
                  removeProductMutation.mutate({
                    productId: product.productid,
                    gtinCode: product.gtincode.toString()
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
