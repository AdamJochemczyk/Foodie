/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: remove any, problem with supabase types in joins
import { useRouter } from "next/router";
import React from "react";
import { ActionButton } from "src/common/ActionButton/ActionButton";
import { useDeleteProduct, useGetProduct } from "../../hooks";
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
              name: product.name,
              gtincode: product.gtincode.toString(),
              photo: null
            }}
          />
          <div className={styles.wrapper}>
            <p className={styles.subtitle}>Card:</p>
            <div className={styles.content}>
              <ProductCard
                productId={product.productid}
                name={product.name}
                photoLink={product.photolink}
                category={product.category}
                showFavButton={false}
              />
              <p className={styles.person}>
                Provided by: {(product as any).user.email}
              </p>
              <ActionButton
                variant="danger"
                text="remove product"
                isLoading={removeProductMutation.isLoading}
                onClick={() =>
                  removeProductMutation.mutate({
                    productid: product.productid,
                    gtincode: product.gtincode.toString()
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
