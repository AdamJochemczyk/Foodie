import { Layout } from "src/common/Layout/Layout";
import { ProtectedWrapper } from "src/common/ProtectedWrapper/ProtectedWrapper";
import { RecipeAddEdit } from "src/modules/Recipes/RecipeAddEdit/RecipeAddEdit";

const RecipeAdd = () => {
  return (
    <ProtectedWrapper>
      <Layout>
        <RecipeAddEdit mode="add" />
      </Layout>
    </ProtectedWrapper>
  );
};

export default RecipeAdd;
