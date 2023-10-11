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

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ChangePassword from "./pages/ChangePassword";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";
import Error from "./pages/Error";
import { setCurrentUser } from "./app/userSlice";
import store from "app/store";
import jwtDecode from "jwt-decode";

if (localStorage.getItem("token")) {
  console.log("setcurent user");
  store.dispatch(setCurrentUser(jwtDecode(localStorage.getItem("token"))));
}

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
            <Route path="changepassword" element={<ChangePassword />} />
            <Route
              path="createProduct"
              element={
                <ProtectedRoute>
                  <CreateProduct />
                </ProtectedRoute>
              }
            />

            <Route
              path="editProduct/:id"
              element={
                <ProtectedRoute>
                  <EditProduct />
                </ProtectedRoute>
              }
            />
            <Route path="ProductDetail/:id" element={<ProductDetail />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Content>
        <br />
        <Footer>
          <MyFooter></MyFooter>
        </Footer>
      </Layout>
    </>
  );
}

export default App;
