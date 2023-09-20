import { Layout } from "antd";
import React from "react";

const MyFooter_ = () => {
  const { Footer } = Layout;
  return (
    <Footer style={{ textAlign: "center" }}>
      Ant Design ©2023 Created by Ant UED
      <p>@2023 All Rights Reserved</p>
    </Footer>
  );
};

export default MyFooter_;
