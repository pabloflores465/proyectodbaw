import React, { useContext } from "react";

import { Outlet } from "react-router-dom";

import AboutUS from "../components/AboutUs";
import Navigation from "./Navigation";
import Notifications from "../components/Notifications";
import { NotificationContext } from "../context/NotificationContext";

export default function Layout() {
  const {notifications, setNotifications} = useContext(NotificationContext)

  return (
    <>
      <Notifications notifications={notifications} setNotifications={setNotifications} />

      <Navigation/>
      {/*this for navigation styling*/}
      <div style={{height:'38px', backgroundColor: "#fcf3f4" }}/>
      
      <Outlet />
      
      <AboutUS/>    
      
    </>
  );
}
