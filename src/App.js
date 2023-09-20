import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import {
  NavBar,
  MyFooter,
  MyContent,
} from "./Components/LandingPageComponents";
import { Layout } from "antd";

function App() {
  return (
    <>
      <Layout className="layout">
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<MyContent />} />
        </Routes>
        <MyFooter></MyFooter>
      </Layout>
    </>
  );
}

export default App;
