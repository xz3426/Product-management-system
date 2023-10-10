import React, { useMemo } from "react";
import { Card, List, Button } from "antd";
import { useNavigate } from "react-router-dom";
import Meta from "antd/es/card/Meta";
import jwt_decode from "jwt-decode";

const ProductItem = ({ item }) => {
  let isAdmin;
  const token = localStorage.getItem("token");
  if (token) {
    const authorization = jwt_decode(token).authorization;
    if (authorization === "admin") {
      isAdmin = true;
    }
  }
  const navigate = useNavigate();
  return (
    <List.Item>
      <Card
        style={{ width: "242px", height: "323px" }}
        cover={
          <img
            src={
              item.imgLink ||
              "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            }
            onClick={() => navigate(`ProductDetail/${item._id}`)}
            style={{ cursor: "pointer" }}
            width={"262"}
            height={"159"}
          />
        }
        actions={[
          <Button type="primary" onClick={() => console.log("Add clicked")}>
            Add
          </Button>,
          <Button disabled={!isAdmin} onClick={() => navigate("/editProduct")}>
            Edit
          </Button>,
        ]}
      >
        <Meta
          description={item.productName}
          style={{ cursor: "pointer" }}
          onClick={() => navigate(`ProductDetail/${item._id}`)}
        />
        <Meta title={`Price: $${item.price}`} />
      </Card>
    </List.Item>
  );
};

export default ProductItem;
