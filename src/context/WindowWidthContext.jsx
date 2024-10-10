
import React, { createContext, useEffect, useState } from 'react';

export const WindowWidthContext = createContext();

const WindowWidthProvider = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Function to detect screen size
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup listener by rezising the component
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <WindowWidthContext.Provider value={{ windowWidth }}>
      {children}
    </WindowWidthContext.Provider>
  );
};

export default WindowWidthProvider;
