import React from "react";
import { Layout } from "src/common/Layout/Layout";
import { ProtectedWrapper } from "src/common/ProtectedWrapper/ProtectedWrapper";
import { EditRecipe } from "src/modules/Recipes/components/EditRecipe/EditRecipe";

const VerifyRecipe = () => {
  return (
    <ProtectedWrapper adminRestrictions>
      <Layout>
        <EditRecipe />
      </Layout>
    </ProtectedWrapper>
  );
};

export default VerifyRecipe;
