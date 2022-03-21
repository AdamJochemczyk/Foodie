import React from "react";
import { Layout } from "src/common/Layout/Layout";
import { ProtectedWrapper } from "src/common/ProtectedWrapper/ProtectedWrapper";
import { EditProduct } from "src/modules/Products/components/EditProduct/EditProduct";

const index = () => {
  return (
    <ProtectedWrapper adminRestrictions>
      <Layout>
        <EditProduct />
      </Layout>
    </ProtectedWrapper>
  );
};

export default index;
