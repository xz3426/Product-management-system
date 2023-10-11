import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Layout, Input, Badge, Avatar, Button, Popover, List } from "antd";
import { logOutUser } from "app/userSlice";
import Cart from "Components/Cart";
import { searchProductsAction } from "app/productSlice";

const { Header } = Layout;
const { Search } = Input;

const NavBar_ = () => {
  const navigate = useNavigate();
  const isSignedIn = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(logOutUser());
  };
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [cartItemCount, setCartItemCount] = useState(cartItems.length);

  useEffect(() => {
    console.log(cartItems.length);
    setCartItemCount(cartItems.length);
  }, [cartItems]);

  return (
    <div className="nav-bar">
      <Header
        style={{
          display: "flex",
          position: "fixed",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          marginLeft: "-50px",
          zIndex: "1000",
        }}
      >
        <Link to="/">
          <h2>Management Chuwa</h2>
        </Link>
        <Search
          placeholder="Search"
          allowClear
          enterButton="Search"
          size="middle"
          style={{ width: "30%" }}
          onSearch={(value) => {
            dispatch(searchProductsAction(value));
          }}
        />
        <div>
          <Badge>
            <Avatar shape="square" icon={<UserOutlined />} />
          </Badge>
          {isSignedIn === true ? (
            <Link to="/SignIn" onClick={signOut}>
              SignOut
            </Link>
          ) : (
            <Link to="/SignIn">SignIn</Link>
          )}
        </div>
        {/* Cart icon with popover */}
        <Popover
          placement="bottomRight"
          content={Cart}
          trigger="click"
          overlayStyle={{
            width: "30vw",
          }}
        >
          <Badge count={cartItemCount} size="small">
            <ShoppingCartOutlined
              style={{
                fontSize: "22px",
                color: "white",
              }}
            />
          </Badge>
        </Popover>
      </Header>
    </div>
  );
};

export default NavBar_;
