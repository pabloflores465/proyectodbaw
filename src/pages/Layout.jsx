import React, { useContext } from "react";

import { Outlet } from "react-router-dom";

import AboutUS from "../components/AboutUs";
import Navigation from "./Navigation";
import Notifications from "../components/Notifications";
import { NotificationContext } from "../context/NotificationContext";
import { WindowWidthContext } from "../context/WindowWidthContext";
import NavigationDesktop from "../components/NavigationDesktop";
import NavigationMobile from "../components/NavigationMobile";
import { UserProfileContext } from "../context/UserProfileContext";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";

export default function Layout() {
  const { notifications, setNotifications } = useContext(NotificationContext);
  const { windowWidth } = useContext(WindowWidthContext);
  const {
    showLogin,
    showSignup,
    showProfile,
    setShowLogin,
    setShowSignup,
    setShowProfile,
  } = useContext(UserProfileContext);

  return (
    <>
      <Notifications
        notifications={notifications}
        setNotifications={setNotifications}
      />

      {windowWidth > 1000 ? <NavigationDesktop /> : <NavigationMobile />}

      <Login show={showLogin} setShow={setShowLogin} />
      <Signup show={showSignup} setShow={setShowSignup} />
      <Profile show={showProfile} setShow={setShowProfile} />

      <Outlet />

      <AboutUS />
    </>
  );
}
