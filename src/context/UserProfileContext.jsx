
import React, { createContext, useEffect, useState } from 'react';
import useLocalStorage from "../hooks/useLocalStorage.js";

export const UserProfileContext = createContext();

const UserProfileProvider = ({ children }) => {
  let guestProfile = {
    firstName: "Guest",
    lastName: null,
    email: null,
    birthDate: null,
    address: null,
    phoneNumber: null,
    rol: 0, //0=Guest, 1=Client, 2=Employee, 3=Admin
    active: false,
    cardNumber: null,
    expireDate: null,
    userId: null,
    lastConection: null,
  };
   
  const [userProfile, setUserProfile] = useLocalStorage (
    "userName",
    guestProfile
  );

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <UserProfileContext.Provider value={{ userProfile, setUserProfile, guestProfile, showLogin, setShowLogin, showSignup, setShowSignup, showProfile, setShowProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export default UserProfileProvider;
