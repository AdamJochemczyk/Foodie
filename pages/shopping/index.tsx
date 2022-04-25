import React from "react";
import { Layout } from "src/common/Layout/Layout";
import { ProtectedWrapper } from "src/common/ProtectedWrapper/ProtectedWrapper";
import { ShoppingListPage } from "src/modules/Shopping/components/ShoppingListPage/ShoppingListPage";

export default function ShoppingList() {
  return (
    <ProtectedWrapper>
      <Layout>
        <ShoppingListPage />
      </Layout>
    </ProtectedWrapper>
  );
}
