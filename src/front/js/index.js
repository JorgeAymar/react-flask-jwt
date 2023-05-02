// index.js
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Layout from "./layout";
import { AuthProvider } from "./AuthContext";

//include your index.scss file into the bundle
import "../styles/index.css";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("app")
);
