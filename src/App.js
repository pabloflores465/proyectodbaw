import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Router from "./routes/Router.jsx";
import UserProfileContextProvider from "./context/UserProfileContext.jsx";
import WindowWidthContextProvider from "./context/WindowWidthContext.jsx";
import EditModeContextProvider from "./context/EditModeContext.jsx";
import NotificationContextProvider from "./context/NotificationContext.jsx";
import ClicksNumberProvider from "./context/ClicksNumberContext.jsx";
import SearchProductsProvider, { SearchProductsContext } from "./context/SearchProductsContext.jsx";

function App() {
  return (
    <React.StrictMode>
      <UserProfileContextProvider>
        <WindowWidthContextProvider>
          <EditModeContextProvider>
            <NotificationContextProvider>
              <ClicksNumberProvider>
                <SearchProductsProvider>
                  <Router />
                </SearchProductsProvider>
              </ClicksNumberProvider>
            </NotificationContextProvider>
          </EditModeContextProvider>
        </WindowWidthContextProvider>
      </UserProfileContextProvider>
    </React.StrictMode>
  );
}

export default App;
