import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import Navigation from "./Navigation";
import AboutUS from "../components/AboutUs";
import { Image } from "react-bootstrap";

function ErrorPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const handlePopState = (event) => {
      if (window.location.pathname === "/error") {
        navigate("/");
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <>
      <Navigation />
      <div style={{ height: "80px" }} />
      <div className="ms-auto me-auto">
        <Image
          src={`${process.env.PUBLIC_URL}/confusedDog.webp`}
          style={{ minHeight: "300px", maxHeight:'700px' }}
          fluid
        />
      </div>

      <div
        style={{ fontSize: "50px", marginTop: "0px", textAlign: "justify", textAlignLast: "center"  }}
        className="d-flex justify-content-center mb-5 text-align-center mx-2 text-success "
      >
        <strong>Sorry, page not found</strong>
      </div>

      <AboutUS />
    </>
  );
}

export default ErrorPage;
