import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import Navigation from "./Navigation";
import AboutUS from "../components/AboutUs";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";

function Error() {
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
      <Button as={Link} to="/" className="mx-auto bg-secondary rounded-pill mb-4 text-white d-flex flex-row align-items-center" style={{fontSize:"30px"}}><IoHomeSharp className="me-2"/> Go to Home</Button>
    </>
  );
}

export default Error;
