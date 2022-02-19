import React from "react";
import { Layout } from "../../src/common/Layout/Layout";
import { ProtectedWrapper } from "../../src/common/ProtectedWrapper/ProtectedWrapper";

export default function Recipes() {
  return (
    <ProtectedWrapper>
      <Layout>Recipes</Layout>
    </ProtectedWrapper>
  );
}
