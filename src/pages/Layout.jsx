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
      
      <Outlet />
      
      <AboutUS/>    
      
    </>
  );
}
