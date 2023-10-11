import React, { useState, useEffect } from "react";
import { Card, List, Button } from "antd";
import { useNavigate } from "react-router-dom";
import Meta from "antd/es/card/Meta";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductc,
  fetchCartc,
  updateQuantityc,
  selectProductQuantityInCart,
} from "app/cartSlice";
import jwt_decode from "jwt-decode";
import { removeProductc } from "app/cartSlice";

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
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const quantity = useSelector((state) =>
    selectProductQuantityInCart(state, item._id)
  );

  useEffect(() => {
    if (user?.username) {
      dispatch(fetchCartc({ username: user?.username }));
    }
  }, []);

  const handleAdd = () => {
    const data = { username: user.username, productId: item._id };
    dispatch(addProductc(data)).then(() => {
      dispatch(fetchCartc({ username: user.username }));
    });
  };

  const handleMinus = () => {
    if (quantity <= 1) {
      dispatch(
        removeProductc({ username: user?.username, productId: item._id })
      ).then(dispatch(fetchCartc({ username: user?.username })));
    } else {
      dispatch(
        updateQuantityc({
          username: user?.username,
          productId: item._id,
          quantity: quantity - 1,
        })
      ).then((action) => {
        dispatch(fetchCartc({ username: user?.username }));
      });
    }
  };

  const actionsToShow =
    quantity === 0
      ? [
          <Button type="primary" onClick={handleAdd}>
            Add
          </Button>,
          <Button
            disabled={!isAdmin}
            onClick={() => navigate(`/editProduct/${item._id}`)}
          >
            Edit
          </Button>,
        ]
      : [
          <Button type="primary" onClick={handleMinus}>
            -
          </Button>,
          quantity,
          <Button type="primary" onClick={handleAdd}>
            +
          </Button>,
          <Button
            disabled={!isAdmin}
            onClick={() => navigate(`/editProduct/${item._id}`)}
          >
            Edit
          </Button>,
        ];

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
        actions={actionsToShow}
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
