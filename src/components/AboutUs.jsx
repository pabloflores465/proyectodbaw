import React, { useContext } from "react";

import { Button, Card, Col, Form, Row } from "react-bootstrap";
import {
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { WindowWidthContext } from "../context/WindowWidthContext";
import { EditModeContext } from "../context/EditModeContext";
import { Link } from "react-router-dom";

let DesktopUI;
let MobileUI;

export default function AboutUS() {
  const { windowWidth } = useContext(WindowWidthContext);
  return <>{windowWidth > 800 ? <DesktopUI /> : <MobileUI />}</>;
}

DesktopUI = () => {
  const { editMode } = useContext(EditModeContext);
  return (
    <>
      <div className="bg-primary w-100 text-white text-center rounded-0 shadow mt-auto">
        <div className="container-grid">
          <div className="d-flex justify-content-center">
            {!editMode ? (
              <strong>About D&P Petshop</strong>
            ) : (
              <Form.Control type="text" />
            )}
          </div>
          <div className="d-flex justify-content-center">
            {!editMode ? (
              <strong>Social Media</strong>
            ) : (
              <Form.Control type="text" />
            )}
          </div>
          <div className="d-flex justify-content-center">
            {!editMode ? (
              <strong>Contact Us</strong>
            ) : (
              <Form.Control type="text" />
            )}
          </div>
          <div className="d-flex justify-content-center">
            {!editMode ? <strong>About</strong> : <Form.Control type="text" />}
          </div>

          <div className="d-flex justify-content-center">
            {!editMode ? (
              <Button as={Link} to="/about/who" className="text-white">
                ¿Who are We?
              </Button>
            ) : (
              <Form.Control type="text" />
            )}
          </div>
          <div className="d-flex justify-content-center">
            {!editMode ? <>Facebook</> : <Form.Control type="text" />}
          </div>
          <div className="d-flex justify-content-center">
            {!editMode ? <>Whatsapp</> : <Form.Control type="text" />}
          </div>
          <div className="d-flex justify-content-center">
            {!editMode ? <>Privacy Policy</> : <Form.Control type="text" />}
          </div>

          <div className="d-flex justify-content-center">
            {!editMode ? (
              <Button as={Link} to="/about/mission" className="text-white">
                Mission
              </Button>
            ) : (
              <Form.Control type="text" />
            )}
          </div>
          <div className="d-flex justify-content-center">
            {!editMode ? <>Instagram</> : <Form.Control type="text" />}
          </div>
          <div className="d-flex justify-content-center">
            {!editMode ? <>+502 1234-4321</> : <Form.Control type="text" />}
          </div>
          <div className="d-flex justify-content-center">
            {!editMode ? (
              <>Devs: Pablo Flores & Nohel Estrada</>
            ) : (
              <Form.Control type="text" />
            )}
          </div>

          <div className="d-flex justify-content-center">
            {!editMode ? (
              <>
                <Button as={Link} to="/about/vision" className="text-white">
                  Vision
                </Button>
              </>
            ) : (
              <Form.Control type="text" />
            )}
          </div>
          <div className="d-flex justify-content-center">
            {!editMode ? <>Tik Tok</> : <Form.Control type="text" />}
          </div>
          <div className="d-flex justify-content-center">
            {!editMode ? <>example@gmail.com</> : <Form.Control type="text" />}
          </div>
          <div className="d-flex justify-content-center">
            {!editMode ? <>License: GPLV3</> : <Form.Control type="text" />}
          </div>
        </div>
      </div>

      <style jsx>{`
        .container-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr); /* Cuatro columnas */
          gap: 10px; /* Espacio entre columnas */
          padding: 10px; /* Espaciado interno */
        }

        .container-grid div {
          text-align: left;
        }
      `}</style>
    </>
  );
};

MobileUI = () => {
  const { editMode } = useContext(EditModeContext);
  return (
    <div class="d-flex flex-column justify-content-center text-align-center align-items-center mt-auto py-2 px-4 bg-primary text-white">
      {!editMode ? (
        <div style={{ fontSize: "25px" }}>
          <strong>About D&P Petshop</strong>
        </div>
      ) : (
        <Form.Control type="text" className="mb-2" />
      )}
      {!editMode ? (
        <div>¿Who are We?</div>
      ) : (
        <Form.Control type="text" className="mb-2" />
      )}
      {!editMode ? (
        <div>Mission</div>
      ) : (
        <Form.Control type="text" className="mb-2" />
      )}
      {!editMode ? (
        <div>Vision</div>
      ) : (
        <Form.Control type="text" className="mb-2 " />
      )}
      {!editMode ? (
        <div style={{ fontSize: "25px" }}>
          <strong>Social Media</strong>
        </div>
      ) : (
        <Form.Control type="text" className="mb-2" />
      )}
      {!editMode ? (
        <div>Facebook</div>
      ) : (
        <Form.Control type="text" className="mb-2 " />
      )}
      {!editMode ? (
        <div>Instagram</div>
      ) : (
        <Form.Control type="text" className="mb-2 " />
      )}
      {!editMode ? (
        <div>Tik Tok</div>
      ) : (
        <Form.Control type="text" className="mb-2" />
      )}
      {!editMode ? (
        <div style={{ fontSize: "25px" }}>
          <strong>Contact Us</strong>
        </div>
      ) : (
        <Form.Control type="text" className="mb-2" />
      )}
      {!editMode ? (
        <div>Whatsapp</div>
      ) : (
        <Form.Control type="text" className="mb-2" />
      )}
      {!editMode ? (
        <div>+502 1234-4321</div>
      ) : (
        <Form.Control type="text" className="mb-2" />
      )}
      {!editMode ? (
        <div>examdivle@gmail.com</div>
      ) : (
        <Form.Control type="text" className="mb-2" />
      )}
      {!editMode ? (
        <div style={{ fontSize: "25px" }}>
          <strong>More Info</strong>
        </div>
      ) : (
        <Form.Control type="text" className="mb-2" />
      )}
      {!editMode ? (
        <div>Privacy Policy</div>
      ) : (
        <Form.Control type="text" className="mb-2" />
      )}
      {!editMode ? (
        <div>Devs: Pablo Flores & Nohel Estrada</div>
      ) : (
        <Form.Control type="text" className="mb-2" />
      )}
      {!editMode ? (
        <div>License: GPLV3</div>
      ) : (
        <Form.Control type="text" className="mb-2" />
      )}
    </div>
  );
};
