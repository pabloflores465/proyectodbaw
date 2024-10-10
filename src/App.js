import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Router from "./routes/Router.jsx";
import UserProfileContextProvider from "./context/UserProfileContext.jsx";
import WindowWidthContextProvider from "./context/WindowWidthContext.jsx";
import EditProductContextProvider from "./context/EditProductContext.jsx";
import NotificationContextProvider from "./context/NotificationContext.jsx";

function App() {

  return (
    <React.StrictMode>
      <UserProfileContextProvider>
        <WindowWidthContextProvider>
          <EditProductContextProvider>
            <NotificationContextProvider>
              <Router/>
            </NotificationContextProvider>
          </EditProductContextProvider>
        </WindowWidthContextProvider>
      </UserProfileContextProvider>
    </React.StrictMode>
  );
}

export default App;
