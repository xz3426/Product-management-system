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
function App() {
  return (
    <>
      <Layout className="layout">
        <NavBar isSignedIn={false}></NavBar>
        <Routes>
          <Route path="/" element={<MyContent />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="SignIn" element={<SignIn />} />
        </Routes>
        <MyFooter></MyFooter>
      </Layout>
    </>
  );
}

export default App;
