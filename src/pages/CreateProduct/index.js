import { Layout, message } from "antd";
import ProductForm from "Components/ProductForm";
import { useDispatch, useSelector } from "react-redux";
import { createProductsAction } from "app/productSlice";

const { Content } = Layout;

const CreateProduct = () => {
  const dispatch = useDispatch();
  const createProductStatus = useSelector((state) => state.products.status);
  const onSubmit = async (data) => {
    dispatch(createProductsAction(data));
  };

  switch (createProductStatus) {
    case "succeeded":
      message.success("Product created successfully");
      break;
    case "failed":
      message.error("Something went wrong in the back end. Please Try Again!");
      break;
    default:
      break;
  }

  return (
    <Content>
      <ProductForm
        buttonText="Add Product"
        onSubmit={onSubmit}
        titleText="Create Product"
      />
    </Content>
  );
};

export default CreateProduct;
