import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { createContext, useEffect, useState } from "react";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./pages/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

export const UserNameContext = createContext();
export const WindowWidthContext = createContext();
export const EditProductContext = createContext();

function App() {
  //You need to wrap the routes in a context to access the variables
  const [userName, setUserName] = useState("Pablo Flores");
  const [userType, setUserType] = useState("Admin");
  const [editProduct, setEditProduct] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  //Function to detect screen size
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
    <React.StrictMode>
      <UserNameContext.Provider
        value={{ userName, setUserName, userType, setUserType }}
      >
        <WindowWidthContext.Provider value={{ windowWidth }}>
          <EditProductContext.Provider value={{ editProduct, setEditProduct }}>
            <RouterProvider router={router} />
          </EditProductContext.Provider>
        </WindowWidthContext.Provider>
      </UserNameContext.Provider>
    </React.StrictMode>
  );
}

export default App;
