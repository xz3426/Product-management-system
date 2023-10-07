import { Layout } from "antd";
import ProductDisplay from "Components/ProductDisplay";
const { Content } = Layout;
const MyContent_ = () => {
  return (
    <Content
      style={{
        padding: "0 50px",
        minHeight: "90vh",
        backgroundColor: "lightgrey",
      }}
    >
      <ProductDisplay />
    </Content>
  );
};

export default MyContent_;
