import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tag, Layout, Space, Image, InputNumber, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { fetchProductById } from "services/products";

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
  useEffect(() => {
    async function fetchData() {
      const response = await fetchProductById(id);
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
              <br />
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
