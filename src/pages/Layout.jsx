import React, { useContext } from "react";

import { Outlet } from "react-router-dom";

import AboutUS from "../components/AboutUs";
import Navigation from "./Navigation";
import { NotificationContext } from "../App";
import Notifications from "../components/Notifications";

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
