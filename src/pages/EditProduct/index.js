import { Layout, message } from "antd";
import ProductForm from "Components/ProductForm";

import { useDispatch, useSelector } from "react-redux";
import { editProductAction } from "app/productSlice";


const { Content } = Layout;

export default function EditProduct() {
  const dispatch = useDispatch();
  const editProductStatus = useSelector((state) => state.products.editstatus);
  
  const onSubmit = async (data) => {
    dispatch(editProductAction(data));
  };


  switch (editProductStatus) {
    case "succeeded":
      message.success("Product edited successfully");
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
        buttonText="Edit Product"
        onSubmit={onSubmit}
        titleText="Edit Product"
      />
    </Content>
  );
}
