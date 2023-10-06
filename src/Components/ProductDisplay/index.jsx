import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProductsAction } from "app/productSlice";
import ProductItemList from "./ProductItemList";
import LoadingPage from "./LoadingPage";
import { Select, Space, Button } from "antd";
import styles from "./style.module.css";

export default function ProductDisplay() {
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
      return <ProductItemList products={products} />;
    }
    return <LoadingPage />;
  };

  const handleChange = (value) => {
    console.log(value);
  };

  return (
    <div>
      <Space direction="horizontal">
        <h1>Products</h1>
        <Select
          defaultValue="Last added"
          style={{ width: 120 }}
          options={[
            { value: "Last added", label: "Last added" },
            { value: "Price: low to high", label: "Price: low to high" },
            { value: "Price: high to low", label: "Price: high to low" },
          ]}
          onChange={handleChange}
        />
        <Button
          type="primary"
          size="large"
          onClick={() => navigate("/createProduct")}
        >
          Add Product
        </Button>
      </Space>
      {conditionalRender()}
    </div>
  );
}
