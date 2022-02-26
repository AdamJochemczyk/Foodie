import React from "react";
import { Layout } from "../../../src/common/Layout/Layout";
import { ProtectedWrapper } from "../../../src/common/ProtectedWrapper/ProtectedWrapper";

const index = () => {
  return (
    <ProtectedWrapper adminRestrictions>
      <Layout>Product verify specific</Layout>
    </ProtectedWrapper>
  );
};

export default index;
