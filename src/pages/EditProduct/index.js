import { Layout } from "antd";
import ProductForm from "Components/ProductForm";

const { Content } = Layout;

export default function EditProduct() {

  return (
    <Content>
      <ProductForm
        buttonText="Edit Product"
        // onSubmit={onSubmit}
        titleText="Edit Product"
      />
    </Content>
  );
}
