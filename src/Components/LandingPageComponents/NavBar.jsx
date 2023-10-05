import { Layout, Input, Badge, Avatar } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";

const { Header } = Layout;
const { Search } = Input;

// const NavBar_ = ({ isSignedIn, setIsSignedIn}) => {
  // const handleSignOut = () => {
  //   setIsSignedIn(false);
  // }

const NavBar_ = () => {
  return (
    <div className="nav-bar">
      <Header
        style={{
          display: "flex",
          position: "fixed",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          marginLeft:"-50px",
          // padding: "8px 64px 8px 64px",
          zIndex: "1000"
        }}
      >
        <a>
          <h2>Management Chuwa</h2>
        </a>
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
          <Link to="/SignIn">SignIn</Link>
          
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
