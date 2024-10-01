import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { createContext, useContext, useEffect, useState } from "react";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import useLocalStorage from "./hooks/useLocalStorage";

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
export const EmailContext = createContext();
export const RolContext = createContext();

function App() {
  const [ userName, setUserName ] = useLocalStorage("userName", "Guest");
  const [ editProduct, setEditProduct ] = useLocalStorage("editProduct", false);
  const [ rol, setRol ] = useLocalStorage("rol", 0); //0=Guest, 1=Invited, 2=Employee, 3=Admin
  const [email, setEmail]=useState("");
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
        value={{ userName, setUserName }}
      >
        <WindowWidthContext.Provider value={{ windowWidth }}>
          <EditProductContext.Provider value={{ editProduct, setEditProduct }}>
            <EmailContext.Provider value={{email, setEmail}}>
              <RolContext.Provider value = {{rol, setRol}}>
              <RouterProvider router={router} />
              </RolContext.Provider>
            </EmailContext.Provider>
          </EditProductContext.Provider>
        </WindowWidthContext.Provider>
      </UserNameContext.Provider>
    </React.StrictMode>
  );
}

export default App;
