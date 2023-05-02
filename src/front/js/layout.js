// layout.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home2 } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
// layout.js
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import Private from "./views/Private.jsx";
import NotFound from "./views/NotFound.jsx";
import Home from "./views/Home.jsx";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div>
      <ScrollToTop>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/private" element={<Private />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </ScrollToTop>
    </div>
  );
};

export default injectContext(Layout);
