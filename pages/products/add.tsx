import { ProductAdd } from "../../src/modules/Products/ProductAdd/ProductAdd";
import { Layout } from "../../src/common/Layout/Layout";
import { ProtectedWrapper } from "../../src/common/ProtectedWrapper/ProtectedWrapper";

const ProductsAdd = () => {
  return (
    <ProtectedWrapper>
      <Layout>
        <ProductAdd />
      </Layout>
    </ProtectedWrapper>
  );
};

export default ProductsAdd;
