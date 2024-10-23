import React, { useContext, useEffect, useState } from "react";

import { Button, Form } from "react-bootstrap";
import { WindowWidthContext } from "../context/WindowWidthContext";
import { EditModeContext } from "../context/EditModeContext";
import { NotificationContext } from "../context/NotificationContext";
import { Link } from "react-router-dom";
import getFooter from "../conections/getFooter";
import putFooter from "../conections/putFooter";

let DesktopUI;
let MobileUI;

export default function AboutUS() {
  const [footer, setFooter] = useState({});
  const { setNotifications } = useContext(NotificationContext);
  const { editMode } = useContext(EditModeContext);
  useEffect(() => {
    getFooter(setFooter, setNotifications);
  }, []);
  useEffect(() => {
    if (Object.keys(footer).length > 0 && editMode===false) {
      putFooter(footer, setNotifications);
    }
  }, [editMode]);
  const handleInput = (value, name) => {
    setFooter((prevFooter) => ({
      ...prevFooter,
      [name]: value,
    }));
  };

  const { windowWidth } = useContext(WindowWidthContext);
  return (
    <>
      {windowWidth > 800 ? (
        <DesktopUI
          footer={footer}
          editMode={editMode}
          handleInput={handleInput}
        />
      ) : (
        <MobileUI footer={footer} />
      )}
    </>
  );
}

DesktopUI = ({ footer, editMode, handleInput }) => {
  return (
    <>
      <div className="bg-primary w-100 text-white text-center rounded-0 shadow mt-auto">
        <div className="container-grid">
          <div className="d-flex justify-content-center">
            {!editMode ? (
              <strong>{footer.title1}</strong>
            ) : (
              <Form.Control
                type="text"
                name="title1"
                onChange={(e) => handleInput(e.target.value, e.target.name)}
              />
            )}
          </div>
          <div className="d-flex justify-content-center">
            {!editMode ? (
              <strong>{footer.title2}</strong>
            ) : (
              <Form.Control
                type="text"
                name="title2"
                onChange={(e) => handleInput(e.target.value, e.target.name)}
              />
            )}
          </div>
          <div className="d-flex justify-content-center">
            {!editMode ? (
              <strong>{footer.title3}</strong>
            ) : (
              <Form.Control
                type="text"
                name="title3"
                onChange={(e) => handleInput(e.target.value, e.target.name)}
              />
            )}
          </div>
          <div className="d-flex justify-content-center">
            {!editMode ? (
              <strong>{footer.title4}</strong>
            ) : (
              <Form.Control
                type="text"
                name="title4"
                onChange={(e) => handleInput(e.target.value, e.target.name)}
              />
            )}
          </div>

          <div className="d-flex justify-content-center">
            {!editMode ? (
              <Button as={Link} to="/about/who" className="text-white">
                {footer.line11}
              </Button>
            ) : (
              <Form.Control
                type="text"
                name="line11"
                onChange={(e) => handleInput(e.target.value, e.target.name)}
              />
            )}
          </div>
          <div className="d-flex justify-content-center">
            {!editMode ? (
              <div>{footer.line21}</div>
            ) : (
              <Form.Control
                type="text"
                name="line21"
                onChange={(e) => handleInput(e.target.value, e.target.name)}
              />
            )}
          </div>
          <div className="d-flex justify-content-center">
            {!editMode ? (
              <>{footer.line31}</>
            ) : (
              <Form.Control
                type="text"
                name="title31"
                onChange={(e) => handleInput(e.target.value, e.target.name)}
              />
            )}
          </div>
          <div className="d-flex justify-content-center">
            {!editMode ? (
              <>{footer.line41}</>
            ) : (
              <Form.Control
                type="text"
                name="title41"
                onChange={(e) => handleInput(e.target.value, e.target.name)}
              />
            )}
          </div>

          <div className="d-flex justify-content-center">
            {!editMode ? (
              <Button as={Link} to="/about/mission" className="text-white">
                {footer.line12}
              </Button>
            ) : (
              <Form.Control
                type="text"
                name="line12"
                onChange={(e) => handleInput(e.target.value, e.target.name)}
              />
            )}
          </div>
          <div className="d-flex justify-content-center">
            {!editMode ? (
              <>{footer.line22}</>
            ) : (
              <Form.Control
                type="text"
                name="line22"
                onChange={(e) => handleInput(e.target.value, e.target.name)}
              />
            )}
          </div>
          <div className="d-flex justify-content-center">
            {!editMode ? (
              <>{footer.line32}</>
            ) : (
              <Form.Control
                type="text"
                name="line32"
                onChange={(e) => handleInput(e.target.value, e.target.name)}
              />
            )}
          </div>
          <div className="d-flex justify-content-center">
            {!editMode ? (
              <>{footer.line42}</>
            ) : (
              <Form.Control
                type="text"
                name="line42"
                onChange={(e) => handleInput(e.target.value, e.target.name)}
              />
            )}
          </div>

          <div className="d-flex justify-content-center">
            {!editMode ? (
              <>
                <Button as={Link} to="/about/vision" className="text-white">
                  {footer.line13}
                </Button>
              </>
            ) : (
              <Form.Control
                type="text"
                name="line13"
                onChange={(e) => handleInput(e.target.value, e.target.name)}
              />
            )}
          </div>
          <div className="d-flex justify-content-center">
            {!editMode ? (
              <>{footer.line23}</>
            ) : (
              <Form.Control
                type="text"
                name="line23"
                onChange={(e) => handleInput(e.target.value, e.target.name)}
              />
            )}
          </div>
          <div className="d-flex justify-content-center">
            {!editMode ? (
              <>{footer.line33}</>
            ) : (
              <Form.Control
                type="text"
                name="line33"
                onChange={(e) => handleInput(e.target.value, e.target.name)}
              />
            )}
          </div>
          <div className="d-flex justify-content-center">
            {!editMode ? (
              <>{footer.line43}</>
            ) : (
              <Form.Control
                type="text"
                name="line43"
                onChange={(e) => handleInput(e.target.value, e.target.name)}
              />
            )}
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

MobileUI = ({ footer }) => {
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
