import { Layout, Input, Space } from "antd";
import React from "react";
const { Header } = Layout;
const { Search } = Input;

const NavBar_ = () => {
  return (
    <Header style={{ display: "flex", alignItems: "center" }}>
      <div className="demo-logo" />
      <Search
        placeholder="Search"
        allowClear
        enterButton="Search"
        size="middle"
        onSearch={() => {}}
      />
    </Header>
  );
};

export default NavBar_;
