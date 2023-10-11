import { Card, List, Button } from "antd";
import { useNavigate } from "react-router-dom";
import Meta from "antd/es/card/Meta";
import { useDispatch, useSelector } from 'react-redux';
import { addProductc,fetchCartc } from 'app/cartSlice';
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
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const cartItems = useSelector((state) => state.cart.cartItems)
  const handleAdd = () => {
    const data = {username:user.username, productId:item._id}
    console.log(123213213123);
    console.log(cartItems);
    dispatch(addProductc(data));
    dispatch(fetchCartc({username:"test"}));
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
            onClick={() => navigate(`ProductDetail/${item._id}`)}
            style={{ cursor: "pointer" }}
            width={"262"}
            height={"159"}
          />
        }
        actions={[
          <Button type="primary" onClick={handleAdd}>
            Add
          </Button>,
          <Button
            disabled={!isAdmin}
            onClick={() => navigate(`/editProduct/${item._id}`)}
          >
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
