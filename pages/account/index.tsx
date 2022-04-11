import React from "react";
import { Layout } from "src/common/Layout/Layout";
import { ProtectedWrapper } from "src/common/ProtectedWrapper/ProtectedWrapper";
import { UserPanelPage } from "src/modules/User/UserPanelPage/UserPanelPage";

const UserPanel = () => {
  return (
    <ProtectedWrapper>
      <Layout>
        <UserPanelPage />
      </Layout>
    </ProtectedWrapper>
  );
};

export default UserPanel;
