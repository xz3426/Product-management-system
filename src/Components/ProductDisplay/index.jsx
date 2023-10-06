import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsAction } from "app/productSlice";
import ProductItemList from "./ProductItemList";
import LoadingPage from "./LoadingPage";
import styles from "./style.module.css";

export default function ProductDisplay() {
  const { products, productFetchingStatus } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductsAction());
  }, []);

  if (productFetchingStatus === "succeeded") {
    return <ProductItemList products={products} />;
  }

  if (productFetchingStatus === "idel" || productFetchingStatus === "pending") {
    return <LoadingPage />;
  }

  return <></>;
}
