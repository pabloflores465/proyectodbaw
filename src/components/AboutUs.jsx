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
  const [edited, setEdited] = useState(false);
  const { setNotifications } = useContext(NotificationContext);
  const { editMode } = useContext(EditModeContext);
  useEffect(() => {
    setEdited(false);
    getFooter(setFooter, setNotifications);
  }, []);
  useEffect(() => {
    if (edited && Object.keys(footer).length > 0 && editMode === false) {
      putFooter(footer, setNotifications);
      setEdited(false);
    }
  }, [editMode]);
  const handleInput = (value, name) => {
    setFooter((prevFooter) => ({
      ...prevFooter,
      [name]: value,
    }));
    setEdited(true);
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
        <MobileUI
          footer={footer}
          editMode={editMode}
          handleInput={handleInput}
        />
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
                defaultValue={footer.title1}
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
                defaultValue={footer.title2}
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
                defaultValue={footer.title3}
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
                defaultValue={footer.title4}
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
                defaultValue={footer.line11}
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
                defaultValue={footer.line21}
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
                defaultValue={footer.line31}
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
                defaultValue={footer.line41}
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
                defaultValue={footer.line12}
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
                defaultValue={footer.line22}
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
                defaultValue={footer.line32}
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
                defaultValue={footer.line42}
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
                defaultValue={footer.line13}
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
                defaultValue={footer.line23}
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
                defaultValue={footer.line33}
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
                defaultValue={footer.line43}
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

MobileUI = ({ footer, editMode, handleInput }) => {
  return (
    <div class="d-flex flex-column justify-content-center text-align-center align-items-center mt-auto py-2 px-4 bg-primary text-white">
      {!editMode ? (
        <div style={{ fontSize: "25px" }}>
          <strong>{footer.title1}</strong>
        </div>
      ) : (
        <Form.Control
          type="text"
          className="mb-2"
          name="title1"
          defaultValue={footer.title1}
          onChange={(e) => handleInput(e.target.value, e.target.name)}
        />
      )}
      {!editMode ? (
        <div>{footer.line11}</div>
      ) : (
        <Form.Control
          type="text"
          className="mb-2"
          name="line11"
          defaultValue={footer.line11}
          onChange={(e) => handleInput(e.target.value, e.target.name)}
        />
      )}
      {!editMode ? (
        <div>{footer.line12}</div>
      ) : (
        <Form.Control
          type="text"
          className="mb-2"
          name="line12"
          defaultValue={footer.line12}
          onChange={(e) => handleInput(e.target.value, e.target.name)}
        />
      )}
      {!editMode ? (
        <div>{footer.line13}</div>
      ) : (
        <Form.Control
          type="text"
          className="mb-2 "
          name="line13"
          defaultValue={footer.line13}
          onChange={(e) => handleInput(e.target.value, e.target.name)}
        />
      )}
      {!editMode ? (
        <div style={{ fontSize: "25px" }}>
          <strong>{footer.title2}</strong>
        </div>
      ) : (
        <Form.Control
          type="text"
          className="mb-2"
          name="title2"
          defaultValue={footer.title2}
          onChange={(e) => handleInput(e.target.value, e.target.name)}
        />
      )}
      {!editMode ? (
        <div>{footer.line21}</div>
      ) : (
        <Form.Control
          type="text"
          className="mb-2 "
          name="line21"
          defaultValue={footer.line21}
          onChange={(e) => handleInput(e.target.value, e.target.name)}
        />
      )}
      {!editMode ? (
        <div>{footer.line22}</div>
      ) : (
        <Form.Control
          type="text"
          className="mb-2 "
          name="line22"
          defaultValue={footer.line22}
          onChange={(e) => handleInput(e.target.value, e.target.name)}
        />
      )}
      {!editMode ? (
        <div>{footer.line23}</div>
      ) : (
        <Form.Control
          type="text"
          className="mb-2"
          name="line23"
          defaultValue={footer.line23}
          onChange={(e) => handleInput(e.target.value, e.target.name)}
        />
      )}
      {!editMode ? (
        <div style={{ fontSize: "25px" }}>
          <strong>{footer.title3}</strong>
        </div>
      ) : (
        <Form.Control
          type="text"
          className="mb-2"
          name="title3"
          defaultValue={footer.title3}
          onChange={(e) => handleInput(e.target.value, e.target.name)}
        />
      )}
      {!editMode ? (
        <div>{footer.line31}</div>
      ) : (
        <Form.Control
          type="text"
          className="mb-2"
          name="line31"
          defaultValue={footer.line31}
          onChange={(e) => handleInput(e.target.value, e.target.name)}
        />
      )}
      {!editMode ? (
        <div>{footer.line32}</div>
      ) : (
        <Form.Control
          type="text"
          className="mb-2"
          name="line32"
          defaultValue={footer.line32}
          onChange={(e) => handleInput(e.target.value, e.target.name)}
        />
      )}
      {!editMode ? (
        <div>{footer.line33}</div>
      ) : (
        <Form.Control
          type="text"
          className="mb-2"
          name="line33"
          defaultValue={footer.line33}
          onChange={(e) => handleInput(e.target.value, e.target.name)}
        />
      )}
      {!editMode ? (
        <div style={{ fontSize: "25px" }}>
          <strong>{footer.title4}</strong>
        </div>
      ) : (
        <Form.Control
          type="text"
          className="mb-2"
          name="title4"
          defaultValue={footer.title4}
          onChange={(e) => handleInput(e.target.value, e.target.name)}
        />
      )}
      {!editMode ? (
        <div>{footer.line41}</div>
      ) : (
        <Form.Control
          type="text"
          className="mb-2"
          name="line41"
          defaultValue={footer.line41}
          onChange={(e) => handleInput(e.target.value, e.target.name)}
        />
      )}
      {!editMode ? (
        <div>{footer.line42}</div>
      ) : (
        <Form.Control
          type="text"
          className="mb-2"
          name="line42"
          defaultValue={footer.line42}
          onChange={(e) => handleInput(e.target.value, e.target.name)}
        />
      )}
      {!editMode ? (
        <div>{footer.line43}</div>
      ) : (
        <Form.Control
          type="text"
          className="mb-2"
          name="footer43"
          defaultValue={footer.line43}
          onChange={(e) => handleInput(e.target.value, e.target.name)}
        />
      )}
    </div>
  );
};
