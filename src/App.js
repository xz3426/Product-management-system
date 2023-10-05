import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import {
  NavBar,
  MyFooter,
  MyContent,
} from "./Components/LandingPageComponents";
import ProtectedRoute from "./Components/ProtectedRoute";
import ProductDetail from "./Components/ProductDetail";
import { Layout } from "antd";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import CreateProduct from "./Pages/CreateProduct";
import EditProduct from "./Pages/EditProduct";

const { Header, Footer, Content } = Layout;

function App() {

  return (
    <>
      <Layout className="layout">
        <Header>
          <NavBar></NavBar>
        </Header>

        <Content>
          <Routes>
            <Route path="/" element={<MyContent />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
            <Route
              path="createProduct"
              element={
                <ProtectedRoute>
                  <CreateProduct />
                </ProtectedRoute>
              }
            />
            <Route path="editProduct" element={<EditProduct />} />
            <Route path="productdetail" element={<ProductDetail />} />
          </Routes>
        </Content>

        <Footer>
          <MyFooter></MyFooter>
        </Footer>
      </Layout>
    </>
  );
}

export default App;
