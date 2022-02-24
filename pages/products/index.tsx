import { Layout } from "../../src/common/Layout/Layout";
import { ProtectedWrapper } from "../../src/common/ProtectedWrapper/ProtectedWrapper";
import { ProductsPage } from "../../src/modules/Products/ProductPage/ProductsPage";

const Products = () => {
  return (
    <ProtectedWrapper>
      <Layout>
        <ProductsPage />
      </Layout>
    </ProtectedWrapper>
  );
};

export default Products;
