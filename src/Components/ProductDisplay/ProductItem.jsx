import React, { useMemo } from "react";
import { Card, List, Button } from "antd";
import { useNavigate } from "react-router-dom";
import Meta from "antd/es/card/Meta";
import { useDispatch, useSelector } from 'react-redux';
import { addProductc,fetchCartc } from 'app/cartSlice';

const ProductItem = ({ item }) => {
  const isAdmin = useMemo(() => localStorage.getItem("token"), []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const cartItems = useSelector((state) => state.cart.cartItems)
  const handleAdd = () => {
    const data = {username:user.username, productId:item._id}

    console.log(cartItems);
    dispatch(addProductc(data)).then(()=>

    {
      dispatch(fetchCartc({username:user.username}));
      console.log('after', cartItems);
    }

    );
  }
    

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
        actions={[
          <Button type="primary" onClick={handleAdd}>
            Add
          </Button>,
          <Button disabled={!isAdmin} onClick={() => navigate("/editProduct")}>
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
