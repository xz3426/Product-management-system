import { Layout, Input, Badge, Avatar } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";

const { Header } = Layout;
const { Search } = Input;

const NavBar_ = ({ isSignedIn }) => {
  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 64px 8px 64px",
      }}
    >
      <h2>Management Chuwa</h2>
      <Search
        placeholder="Search"
        allowClear
        enterButton="Search"
        size="middle"
        style={{ width: "30%" }}
        onSearch={() => {}}
      />
      <Badge>
        <Avatar shape="square" icon={<UserOutlined />} />
      </Badge>

      {isSignedIn ? (
        <Link to="/SignOut">SignOut</Link>
      ) : (
        <Link to="/SignIn">SignIn</Link>
      )}
    </Header>
  );
};

export default NavBar_;
