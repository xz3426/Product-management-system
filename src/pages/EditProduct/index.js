import { Layout, message } from "antd";
import React, { useEffect, useState } from "react";
import ProductForm from "Components/ProductForm";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editProductAction } from "app/productSlice";
import { fetchProductById } from "services/products";


const { Content } = Layout;

export default function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchProductById(id);
      console.log(response);
      setProduct(response);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const dispatch = useDispatch();
  const editProductStatus = useSelector((state) => state.products.productEditStatus);
  
  const onSubmit = async (data) => {
    dispatch(editProductAction({...data, _id:id}));
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
    (<Content>
      {!isLoading && 
        <ProductForm
          buttonText="Edit Product"
          onSubmit={onSubmit}
          product={product}
          titleText="Edit Product"
        />
      }
    </Content>
    )
  );
}
