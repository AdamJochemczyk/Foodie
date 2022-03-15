import { Layout } from "../../../src/common/Layout/Layout";
import { ProtectedWrapper } from "../../../src/common/ProtectedWrapper/ProtectedWrapper";
import { RecipeVerifyGallery } from "../../../src/modules/Recipes/RecipeVerifyGallery/RecipeVerifyGallery";

const RecipeVerification = () => {
  return (
    <ProtectedWrapper adminRestrictions>
      <Layout>
        <RecipeVerifyGallery />
      </Layout>
    </ProtectedWrapper>
  );
};

export default RecipeVerification;
