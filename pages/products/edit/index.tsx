import React from "react";
import { Layout } from "src/common/Layout/Layout";
import { ProtectedWrapper } from "src/common/ProtectedWrapper/ProtectedWrapper";
import { ProductsPage } from "src/modules/Products/components/ProductPage/ProductsPage";

const ProductVerification = () => {
  return (
    <ProtectedWrapper adminRestrictions>
      <Layout>
        <ProductsPage mode="admin" />
      </Layout>
    </ProtectedWrapper>
  );
};

export default ProductVerification;
