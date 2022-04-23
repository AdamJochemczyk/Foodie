import React from "react";
import { Layout } from "src/common/Layout/Layout";
import { ProtectedWrapper } from "src/common/ProtectedWrapper/ProtectedWrapper";
import { MealPage } from "src/modules/Diet/components/MealPage/MealPage";

const MealId = () => {
  return (
    <ProtectedWrapper>
      <Layout>
        <MealPage />
      </Layout>
    </ProtectedWrapper>
  );
};
export default MealId;
