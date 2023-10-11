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
import { fetchCartc } from "./app/cartSlice";
import ChangePassword from "./pages/ChangePassword";
import CreateProduct from "./pages/CreateProduct";
import { setCurrentUser } from "./app/userSlice";
import store from "app/store";
import jwtDecode from "jwt-decode";

if (localStorage.getItem("token")) {
  console.log("setcurent user");
  const user = jwtDecode(localStorage.getItem("token"));
  store.dispatch(setCurrentUser(user));
  store.dispatch(fetchCartc(user.username));
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
            {/* <Route path="cart" element={<Cart/>} /> */}
            <Route
              path="createProduct"
              element={
                <ProtectedRoute>
                  <CreateProduct />
                </ProtectedRoute>
              }
            />
            <Route path="productdetail" element={<ProductDetail />} />
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
