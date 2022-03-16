import React from "react";
import { Layout } from "src/common/Layout/Layout";
import { ProtectedWrapper } from "src/common/ProtectedWrapper/ProtectedWrapper";
import { VerifySpecificProduct } from "src/modules/Products/VerifySpecificProduct/VerifySpecificProduct";

const index = () => {
  return (
    <ProtectedWrapper adminRestrictions>
      <Layout>
        <VerifySpecificProduct />
      </Layout>
    </ProtectedWrapper>
  );
};

export default index;
