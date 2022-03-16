import { ProductAddEdit } from "src/modules/Products/ProductAddEdit/ProductAddEdit";
import { Layout } from "src/common/Layout/Layout";
import { ProtectedWrapper } from "src/common/ProtectedWrapper/ProtectedWrapper";

const ProductsAdd = () => {
  return (
    <ProtectedWrapper>
      <Layout>
        <ProductAddEdit mode="add" />
      </Layout>
    </ProtectedWrapper>
  );
};

export default ProductsAdd;
