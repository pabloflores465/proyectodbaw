import React, { createContext, useState } from 'react';

export const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  let defaultNotification = {
    showNotification: true,
    headerMessage: "Hola",
    bodyMessage: "",
    loading: false,
    type: "default"
  };

  const [notifications, setNotifications] = useState([]);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications, defaultNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
