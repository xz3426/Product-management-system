import { Layout } from "antd";
import React from "react";
const { Header, Menu } = Layout;

const NavBar_ = () => {
  return (
    <Header style={{ display: "flex", alignItems: "center" }}>
      <div className="demo-logo" />
    </Header>
  );
};

export default NavBar_;
