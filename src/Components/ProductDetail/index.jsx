import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tag, Layout, Space, Image, InputNumber, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "services/products";
import {
  addProductc,
  fetchCartc,
  updateQuantityc,
  selectProductQuantityInCart,
} from "app/cartSlice";

const { Content } = Layout;

const title = {
  textAlign: "left",
  fontFamily: "Arial, sans-serif",
  marginLeft: "100px",
};

const container = {
  backgroundColor: "white",
  display: "flex",
  flexDirection: "column",
  marginLeft: "100px",
  marginRight: "100px",
  padding: "50px 100px",
  "font-family": "Arial, sans-serif",
};

const ProductDetail = () => {
  const { id } = useParams();
  const [value, setValue] = useState("1");
  const [product, setProduct] = useState({});
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const quantity = useSelector((state) =>
    selectProductQuantityInCart(state, id)
  );

  const handleAdd = () => {
    if (quantity === 0) {
      dispatch(addProductc({ username: user?.username, productId: id })).then(
        (action) => {
          dispatch(fetchCartc({ username: user?.username }));
        }
      );
    } else {
      dispatch(
        updateQuantityc({
          username: user?.username,
          productId: id,
          quantity: quantity + value,
        })
      ).then((action) => {
        dispatch(fetchCartc({ username: user?.username }));
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetchProductById(id);
      console.log(response);
      setProduct(response);
    }
    fetchData();
  }, []);

  return (
    <Content style={{ padding: "0 50px" }}>
      <div style={{ backgroundColor: "#f5f3f38f" }}>
        <h1 style={title}>Product Detail</h1>
        <div style={container}>
          <Space size={50}>
            <Image width={400} src={product.imgLink} />
            <Content>
              <p style={{ color: "grey" }}>{product.category}</p>
              <h1>{product.productName}</h1>
              <h2>
                <Space size={20}>
                  {`$ ${product.price}`}
                  {Number(product.quantity) === 0 && (
                    <Tag icon={<ExclamationCircleOutlined />} color="warning">
                      Out of Stock
                    </Tag>
                  )}
                </Space>
              </h2>
              <p>{product.description}</p>
              <br />
              <div>
                <Space>
                  <InputNumber
                    min={1}
                    max={product.quantity}
                    value={value}
                    onChange={setValue}
                    disabled={quantity === 0}
                  />
                  <Button type="primary" onClick={handleAdd}>
                    Add To Cart
                  </Button>
                </Space>
              </div>
            </Content>
          </Space>
        </div>
      </div>
    </Content>
  );
};

export default ProductDetail;
