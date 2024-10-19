
import React, { createContext } from 'react';
import useLocalStorage from "../hooks/useLocalStorage.js";

export const ClicksNumberContext = createContext();

const ClicksNumberProvider = ({ children }) => {
   
  const [categoriesClicks, setCategoriesClicks] = useLocalStorage (
    "numberClicks",
    []
  );

  return (
    <ClicksNumberContext.Provider value={{ categoriesClicks, setCategoriesClicks }}>
      {children}
    </ClicksNumberContext.Provider>
  );
};

export default ClicksNumberProvider;