
import React, { createContext } from 'react';
import useLocalStorage from "../hooks/useLocalStorage.jsx";

export const EditProductContext = createContext();

const EditProductProvider = ({ children }) => {
  const [editProduct, setEditProduct] = useLocalStorage("editProduct", false);

  return (
    <EditProductContext.Provider value={{ editProduct, setEditProduct }}>
      {children}
    </EditProductContext.Provider>
  );
};

export default EditProductProvider;
