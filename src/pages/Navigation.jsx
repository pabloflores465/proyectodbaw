import React, { useContext, useEffect, useState } from "react";

import Login from "./Login";
import Profile from "./Profile";
import Signup from "./Signup";
import NewUserAdmin from "./NewUserAdmin";
import UsersList from "./UsersList";
import NavigationDesktop from "../components/NavigationDesktop";
import NavigationMobile from "../components/NavigationMobile";
import { WindowWidthContext } from "../context/WindowWidthContext";
import { useNavigate } from "react-router";

export default function Navigation() {
  
  const { windowWidth } = useContext(WindowWidthContext);

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showNewUserAdmin, setShowNewUserAdmin] = useState(false);
  const [showUsersList, setShowUsersList] = useState(false);

  return (
    <>
        {windowWidth > 1000 ? (
          <NavigationDesktop
            setShowSignup={setShowSignup}
            setShowLogin={setShowLogin}
            setShowProfile={setShowProfile}
            setShowUsersList={setShowUsersList}
            setShowNewUserAdmin={setShowNewUserAdmin}
          />
        ) : (
          <NavigationMobile
            setShowSignup={setShowSignup}
            setShowLogin={setShowLogin}
            setShowProfile={setShowProfile}
            setShowUsersList={setShowUsersList}
            setShowNewUserAdmin={setShowNewUserAdmin}
          />
        )}

      <Login show={showLogin} setShow={setShowLogin} />
      <NewUserAdmin show={showNewUserAdmin} setShow={setShowNewUserAdmin} />
      <Signup show={showSignup} setShow={setShowSignup} />
      <Profile show={showProfile} setShow={setShowProfile} />
      <UsersList show={showUsersList} setShow={setShowUsersList} />
    </>
  );
}
