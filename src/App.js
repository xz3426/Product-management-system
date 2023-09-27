import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import {
  NavBar,
  MyFooter,
  MyContent,
} from "./Components/LandingPageComponents";
import { Layout } from "antd";
import SignUp from 'pages/SignUp';
import SignIn from 'pages/SignIn';
import CreateProduct from "pages/CreateProduct";

function App() {
  return (
    <>
      <Layout className="layout">
        <NavBar isSignedIn={false}></NavBar>
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
