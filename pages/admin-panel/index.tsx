import { Layout } from "src/common/Layout/Layout";
import { ProtectedWrapper } from "src/common/ProtectedWrapper/ProtectedWrapper";
import {
  AdminPanelPage,
  Counts
} from "src/modules/Admin/components/AdminPanelPage/AdminPanelPage";
import { GetServerSideProps } from "next";
import { getCount } from "src/modules/Admin/hooks/getCount";

export const getServerSideProps: GetServerSideProps = async () => {
  const [productCount, recipesCount] = await Promise.all([
    getCount("products"),
    getCount("recipes")
  ]);

  return {
    props: {
      data: { productCount, recipesCount }
    }
  };
};

const AdminPanel = ({ data }: { data: Counts }) => {
  return (
    <ProtectedWrapper adminRestrictions>
      <Layout>
        <AdminPanelPage data={data} />
      </Layout>
    </ProtectedWrapper>
  );
};

export default AdminPanel;
