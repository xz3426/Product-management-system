import { Routes, Route, Link } from "react-router-dom";
import {
  NavBar,
  MyFooter,
  MyContent,
} from "./Components/LandingPageComponents";
import { Layout, Breadcrumb } from "antd";
const { Header, Content, Footer, Sider, Menu } = Layout;

function App() {
  return (
    <Layout className="layout">
      <NavBar></NavBar>
      <MyContent></MyContent>
      <MyFooter></MyFooter>
    </Layout>
  );
}

export default App;
