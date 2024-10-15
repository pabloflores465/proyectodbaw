
import React, { createContext, useEffect, useState } from 'react';
import useLocalStorage from "../hooks/useLocalStorage.js";
import UsersList from '../pages/UsersList.jsx';

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

  return (
    <UserProfileContext.Provider value={{ userProfile, setUserProfile, guestProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export default UserProfileProvider;
