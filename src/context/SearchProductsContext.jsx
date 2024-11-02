import React, { createContext, useContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const SearchProductsContext = createContext();

const SearchProductsProvider = ({ children }) => {
   
  const [searchProducts, setSearchProducts] = useLocalStorage("searchProducts",[])

  return (
    <SearchProductsContext.Provider value={{ searchProducts, setSearchProducts }}>
      {children}
    </SearchProductsContext.Provider>
  );
};

export default SearchProductsProvider;