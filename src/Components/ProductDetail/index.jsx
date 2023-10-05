import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tag, Layout, Space, Image, InputNumber, Button } from "antd";
import { useSelector } from "react-redux";
import { ExclamationCircleOutlined } from "@ant-design/icons";

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
  //   const { product } = useSelector((state) => state.product);
  const product = {
    category: "electronic product",
    url: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS4jC9GWQazavYcMKTwcUF1Wae7BWWm9X0ZYyGfE4hrwgUZKK4hSELEEX-1Bg",
    name: "iPhone 14",
    price: "999",
    description:
      "Apple iPhone 11, 64GB, Black - Unlocked (Renewed) · 4.3 out of 5 stars",
  };

  const [value, setValue] = useState("1");

  return (
    <Content style={{ padding: "0 50px" }}>
      <div style={{ backgroundColor: "#f5f3f38f" }}>
        <h1 style={title}>Product Detail</h1>
        <div style={container}>
          <Space size={50}>
            <Image width={400} src={product.url} />
            <Content>
              <p style={{ color: "grey" }}>{product.category}</p>
              <h1>{product.name}</h1>
              <h2>
                <Space size={20}>
                  {`$ ${product.price}`}
                  <Tag icon={<ExclamationCircleOutlined />} color="warning">
                    Out of Stock
                  </Tag>
                </Space>
              </h2>
              <p>{product.description}</p>
              <br/>
              <div>
                <Space>
                  <InputNumber
                    min={1}
                    max={99}
                    value={value}
                    onChange={setValue}
                  />
                  <Button
                    type="primary"
                    //   onClick={() => {
                    //     setValue(99);
                    //   }}
                  >
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
