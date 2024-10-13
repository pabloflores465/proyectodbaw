import React, { useContext, useEffect, useState } from "react";
import { Spinner, Toast, ToastContainer } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { WindowWidthContext } from "../context/WindowWidthContext";

export default function Notifications({ notifications, setNotifications }) {
  const { windowWidth } = useContext(WindowWidthContext);

  const [position, setPosition] = useState('top-start');

  useEffect(()=>{
    if(windowWidth < 1000){
      setPosition('bottom-center')
    }
    else {
      setPosition('top-start')
    }
  },[windowWidth])

  if (!notifications || !Array.isArray(notifications)) {
    return null;
  }

  return (
    <ToastContainer
      position={position}
      style={{ position: "fixed", marginTop:windowWidth > 1000 ? 70:0 ,zIndex: 2000 }}
      className={windowWidth > 1000 ? "ms-2":"mb-2"}
    >
      {notifications.map((notification, index) => (
        <Toast
          onClose={() => {
            setNotifications((prevNotifications) =>
              prevNotifications.map((notif, i) =>
                i === index ? { ...notif, showNotification: false } : notif
              )
            );
          }}
          key={index}
          show={notification.showNotification}
          delay={4000}
          autohide
          className={`text-white me-auto rounded-bottom ${
            notification.type === "loading"
              ? "bg-primary"
              : notification.type === "error"
              ? "bg-secondary"
              : notification.type === "success"
              ? "bg-success"
              : "bg-danger" // Opcional: un color de fondo para otros tipos
          }`}
        >
          <Toast.Header className="fs-6">
            {notification.type === "loading" ? (
              <div className="me-auto">Loading, Please Wait ...</div>
            ) : (
              <div className="me-auto">
                <strong>{notification.bodyMessage}</strong>
              </div>
            )}
          </Toast.Header>
          <Toast.Body className="text-white rounded-bottom">
            {notification.type === "loading" ? (
              <div className="d-flex justify-content-center align-items-center">
                <Spinner />
              </div>
            ) : (
              <div className="d-flex justify-content-center align-items-center">
                {notification.type === "success" ? (
                  <FaCheckCircle className="me-2" />
                ) : null}
                <strong>{notification.bodyMessage}</strong>
              </div>
            )}
          </Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
}
