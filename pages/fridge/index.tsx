import React from "react";
import { Layout } from "src/common/Layout/Layout";
import { ProtectedWrapper } from "src/common/ProtectedWrapper/ProtectedWrapper";
import { FridgePage } from "src/modules/Fridge/components/FridgePage/FridgePage";

const UserFridge = () => {
  return (
    <ProtectedWrapper>
      <Layout>
        <FridgePage />
      </Layout>
    </ProtectedWrapper>
  );
};

export default UserFridge;
