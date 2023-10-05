import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { signUpUser } from "app/userSlice";
import { Layout, message } from "antd";
import ProductForm from "Components/ProductForm";

const { Content } = Layout;

export default function EditProduct() {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const location = useLocation();
  // const signUpStatus = useSelector((state) => state.user.status);
  // const signUpError = useSelector((state) => state.error.message);




  return (
    <Content>
      <ProductForm
        buttonText="Edit Product"
        // onSubmit={onSubmit}
        title="Edit Product"
      />
    </Content>
  );
}
