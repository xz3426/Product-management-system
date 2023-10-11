import React, { useMemo } from "react";
import { Card, List, Button } from "antd";
import { useNavigate } from "react-router-dom";
import Meta from "antd/es/card/Meta";

const ProductItem = ({ item }) => {
  const isAdmin = useMemo(() => localStorage.getItem("token"), []);
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
          />
        }
        onClick={() => navigate(`ProductDetail/${item._id}`)}
        actions={[
          <Button type="primary" onClick={() => console.log("Add clicked")}>
            Add
          </Button>,
          <Button disabled={!isAdmin} onClick={() => navigate(`/editProduct/${item._id}`)}>
            Edit
          </Button>,
        ]}
      >
        <Meta description={item.productName} />
        <Meta title={`Price: $${item.price}`} />
      </Card>
    </List.Item>
  );
};

export default ProductItem;
