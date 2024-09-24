import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import React, { createContext, useState } from "react";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    errorElement: <ErrorPage />,
    children: [
      {
        path:"/home",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />,
      }
    ],
  },
]);

export const UserNameContext = createContext();

function App() {
  //You need to wrap the routes in a context to access the variables
  const [userName, setUserName] = useState("Guest");
  return (
    <React.StrictMode>
      <UserNameContext.Provider value={{ userName, setUserName }}>
        <RouterProvider router={router} />
      </UserNameContext.Provider>
    </React.StrictMode>
  );
}

export default App;
