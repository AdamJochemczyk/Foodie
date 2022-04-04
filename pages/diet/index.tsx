import React from "react";
import { Layout } from "src/common/Layout/Layout";
import { ProtectedWrapper } from "src/common/ProtectedWrapper/ProtectedWrapper";
import { DietPage } from "src/modules/Diet/components/DietPage/DietPage";

const UserDiet = () => {
  return (
    <ProtectedWrapper>
      <Layout>
        <DietPage />
      </Layout>
    </ProtectedWrapper>
  );
};

export default UserDiet;
