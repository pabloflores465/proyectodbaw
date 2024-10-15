
import React, { createContext } from 'react';
import useLocalStorage from "../hooks/useLocalStorage.js";

export const EditModeContext = createContext();

const EditModeProvider = ({ children }) => {
  const [editMode, setEditMode] = useLocalStorage("EditMode", false);

  return (
    <EditModeContext.Provider value={{ editMode, setEditMode }}>
      {children}
    </EditModeContext.Provider>
  );
};

export default EditModeProvider;
