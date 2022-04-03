import { Layout } from "src/common/Layout/Layout";
import { ProtectedWrapper } from "src/common/ProtectedWrapper/ProtectedWrapper";
import { RecipesPage } from "src/modules/Recipes/components/RecipesPage/RecipesPage";

const RecipeEdit = () => {
  return (
    <ProtectedWrapper adminRestrictions>
      <Layout>
        <RecipesPage mode="admin" />
      </Layout>
    </ProtectedWrapper>
  );
};

export default RecipeEdit;
