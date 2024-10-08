import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { createContext, useEffect, useState } from "react";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./pages/Layout";
import useLocalStorage from "./hooks/useLocalStorage.jsx";

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

export const UserProfileContext = createContext();
export const WindowWidthContext = createContext();
export const EditProductContext = createContext();
export const NotificationContext = createContext();

function App() {
  let guestProfile = {
    firstName: "Guest",
    lastName: null,
    email: null,
    birthDate: null,
    address: null,
    phoneNumber: null,
    rol: 0, //0=Guest, 1=Invited, 2=Employee, 3=Admin
    active: false,
    cardNumber: null,
    expireDate: null,
    userId: null,
    lastConection: null,
  };
  const [userProfile, setUserProfile] = useLocalStorage(
    "userName",
    guestProfile
  );
  const [editProduct, setEditProduct] = useLocalStorage("editProduct", false);
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

  let defaultNotification = {
    showNotification: true,
    headerMessage: "Hola",
    bodyMessage: "",
    loading: false,
    type: "default"
  };

  const [notifications, setNotifications] = useState([]);

  
  return (
    <React.StrictMode>
      <UserProfileContext.Provider
        value={{ userProfile, setUserProfile, guestProfile }}
      >
        <WindowWidthContext.Provider value={{ windowWidth }}>
          <EditProductContext.Provider value={{ editProduct, setEditProduct }}>
            <NotificationContext.Provider
              value={{ notifications, setNotifications, defaultNotification }}
            >
              <RouterProvider router={router} />
            </NotificationContext.Provider>
          </EditProductContext.Provider>
        </WindowWidthContext.Provider>
      </UserProfileContext.Provider>
    </React.StrictMode>
  );
}

export default App;
