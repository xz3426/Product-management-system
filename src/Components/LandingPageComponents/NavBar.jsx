import { Layout, Input, Badge, Avatar } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "app/userSlice";

const { Header } = Layout;
const { Search } = Input;

const NavBar_ = () => {
  const isSignedIn = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(logOutUser());
  };
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
          // padding: "8px 64px 8px 64px",
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
          onSearch={() => {}}
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
        <Link>
          <div to="/cart">
            <ShoppingCartOutlined />
            $0.00
          </div>
        </Link>
      </Header>
    </div>
  );
};

export default NavBar_;
