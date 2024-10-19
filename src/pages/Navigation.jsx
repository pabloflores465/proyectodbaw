import React, { useContext, useState } from "react";

import Login from "./Login";
import Profile from "./Profile";
import Signup from "./Signup";
import NavigationDesktop from "../components/NavigationDesktop";
import NavigationMobile from "../components/NavigationMobile";
import { WindowWidthContext } from "../context/WindowWidthContext";

export default function Navigation() {
  const { windowWidth } = useContext(WindowWidthContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      {windowWidth > 1000 ? <NavigationDesktop /> : <NavigationMobile />}

      
    </>
  );
}
