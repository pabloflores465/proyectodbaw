import React, { createContext, useContext, useState } from 'react';

export const SearchProductsContext = createContext();

const SearchProductsProvider = ({ children }) => {
   
  const [searchProducts, setSearchProducts] = useState([])

  return (
    <SearchProductsContext.Provider value={{ searchProducts, setSearchProducts }}>
      {children}
    </SearchProductsContext.Provider>
  );
};

export default SearchProductsProvider;