import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from 'react-redux';
import { StyleProvider } from '@ant-design/cssinjs';
import reportWebVitals from "./reportWebVitals";
import store from 'app/store';
import { setCurrentUser } from 'app/userSlice';
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <StyleProvider hashPriority="low">
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </StyleProvider>
  </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
