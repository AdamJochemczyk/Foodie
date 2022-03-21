import { Layout } from "src/common/Layout/Layout";
import { ProtectedWrapper } from "src/common/ProtectedWrapper/ProtectedWrapper";
import { ProductAddEdit } from "src/modules/Products/components/ProductAddEdit/ProductAddEdit";

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
