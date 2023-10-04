import { Routes, Route, Link, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./App.css";
import {
  NavBar,
  MyFooter,
  MyContent,
} from "./Components/LandingPageComponents";
import { Layout } from "antd";
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import CreateProduct from "./Pages/CreateProduct";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [isManager, setIsManager] = useState(true);


  return (
    <>
      <Layout className="layout">
        <NavBar isSignedIn={isSignedIn} setIsSignedIn = {setIsSignedIn}></NavBar>
        <Routes>
          <Route path="/" element={<MyContent />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="createProduct" element={<CreateProduct />} />
        </Routes>
        <MyFooter></MyFooter>
      </Layout>
    </>
  );
}

export default App;
