import React from "react";
import { Outlet } from "react-router-dom";
import UserLogin from "./components/UserLogin";
import Footer from "./components/Footer";

function Layout() {
  return (
    <>
      <UserLogin />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
