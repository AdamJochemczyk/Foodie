import React from "react";
import { Layout } from "src/common/Layout/Layout";
import { ProtectedWrapper } from "src/common/ProtectedWrapper/ProtectedWrapper";
import { ProductVerifyGallery } from "src/modules/Products/ProductVerifyGallery/ProductVerifyGallery";

const ProductVerification = () => {
  return (
    <ProtectedWrapper adminRestrictions>
      <Layout>
        <ProductVerifyGallery />
      </Layout>
    </ProtectedWrapper>
  );
};

export default ProductVerification;
