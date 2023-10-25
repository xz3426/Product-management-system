import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchProductsAction,
  sortProductByDate,
  sortProductByPriceHightoLow,
  sortProductByPriceLowtoHigh,
} from "app/productSlice";
import ProductItemList from "./ProductItemList";
import LoadingPage from "./LoadingPage";
import { Select, Space, Button } from "antd";
import { LAST_ADDED, PRICE_HIGH_LOW, PRICE_LOW_HIGH } from "consts";
import jwt_decode from "jwt-decode";
import styles from "./style.module.css";
const container = {
  backgroundColor: "#edebe8",
  display: "flex",
  flexDirection: "column",
  marginLeft: "100px",
  marginRight: "100px",
  padding: "30px 50px",
};

export default function ProductDisplay() {
  let isAdmin;
  const token = localStorage.getItem("token");
  if (token) {
    const authorization = jwt_decode(token).authorization;
    if (authorization === "admin") {
      isAdmin = true;
    }
  }

  
  const { products, productFetchingStatus } = useSelector(
    (state) => state.products
  );


  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchProductsAction());
  }, []);

  const conditionalRender = () => {
    if (productFetchingStatus === "succeeded") {
      return (
        <div style={container}>
          <ProductItemList products={products} />
        </div>
      );
    }
    return <LoadingPage />;
  };

  const handleChange = (value) => {
    switch (value) {
      case LAST_ADDED:
        dispatch(sortProductByDate());
        break;
      case PRICE_HIGH_LOW:
        dispatch(sortProductByPriceHightoLow());
        break;
      case PRICE_LOW_HIGH:
        dispatch(sortProductByPriceLowtoHigh());
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Space direction="horizontal">
        <h1>Products</h1>
        <Select
          defaultValue={LAST_ADDED}
          style={{ width: 120 }}
          options={[
            { value: LAST_ADDED, label: LAST_ADDED },
            { value: PRICE_LOW_HIGH, label: PRICE_LOW_HIGH },
            { value: PRICE_HIGH_LOW, label: PRICE_HIGH_LOW },
          ]}
          onChange={handleChange}
        />
        {isAdmin && (
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/createProduct")}
          >
            Add Product
          </Button>
        )}
      </Space>
      {conditionalRender()}
    </div>
  );
}
