import React from "react";
import { Layout } from "src/common/Layout/Layout";
import { ProtectedWrapper } from "src/common/ProtectedWrapper/ProtectedWrapper";
import RecipesPage from "src/modules/Recipes/RecipesPage/RecipesPage";

export default function Recipes() {
  return (
    <ProtectedWrapper>
      <Layout>
        <RecipesPage />
      </Layout>
    </ProtectedWrapper>
  );
}
