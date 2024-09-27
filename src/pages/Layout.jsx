import React from "react";

import { Outlet } from "react-router-dom";

import AboutUS from "../components/AboutUs";
import Navigation from "../components/Navigation";

export default function Layout() {

  return (
    <>
      <Navigation/>
      
      <Outlet />
      
      <AboutUS/>      
    </>
  );
}
