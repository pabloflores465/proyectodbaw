import React, { useContext } from "react";
import { Button, Image } from "react-bootstrap";
import { IoCloseSharp } from "react-icons/io5";
import { WindowWidthContext } from "../context/WindowWidthContext";

function ProductDetail() {
  const { windowWidth } = useContext(WindowWidthContext);
  return windowWidth > 1000 ? (
    <>
      <div className="d-flex flex-row" style={{marginTop:'70px'}}>
        <div className="container">
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center border-bottom mb-2">
              <Image
                src="/hola.png"
                rounded
                height={480}
                width={640}
                className="me-2 mb-2"
              />
              <div className="d-flex flex-column">
                <strong>Name: title</strong>
                <strong>Description:</strong>
                <div
                  className="w-80 border rounded ps-1 pe-2"
                  style={{
                    wordBreak: "break-word",
                    whiteSpace: "normal",
                    maxHeight: "100px",
                    width: "200px",
                    overflowY: "auto",
                  }}
                >
                  asfjdjkhfkjhdsakjlhsdfklkdfsadjlfkhkjsadhfjhijasdhfjkhjksadhfkjhfgjdaskdfghjksagsjadkhfkjasdbhfjksankjlfnkjsadbnjvbnfjkshadbnvkjsandljknbfvjksdabjhvcbkjsadbvkhjbsakjdbvjkasbkjdvbnkjdvbnskjabdvkjbvkjsa
                </div>
                <strong>Price: $.100.00</strong>
              </div>
              <Button variant="link">
                <IoCloseSharp size={"1.5rem"} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
          <div className="d-flex justify-content-center" style={{marginTop:'90px'}}>
          <Image
            src="/hola.png"
            rounded
            height={480}
            width={640}
            className="me-2 mb-2"
          />
          </div>
          <div className="d-flex align-items-center flex-column">
          <strong>Name: title</strong>
          <strong>Description:</strong>
          <div
            className="w-80 border rounded ps-1 pe-2"
            style={{
              wordBreak: "break-word",
              whiteSpace: "normal",
              maxHeight: "100px",
              width: "200px",
              overflowY: "auto",
            }}
          >
            asfjdjkhfkjhdsakjlhsdfklkdfsadjlfkhkjsadhfjhijasdhfjkhjksadhfkjhfgjdaskdfghjksagsjadkhfkjasdbhfjksankjlfnkjsadbnjvbnfjkshadbnvkjsandljknbfvjksdabjhvcbkjsadbvkhjbsakjdbvjkasbkjdvbnkjdvbnskjabdvkjbvkjsa
          </div>
          <strong>Price: $.100.00</strong>
        <Button className="text-white mb-2">
          <IoCloseSharp size={"1.5rem"} /> Close
        </Button>
        </div>
    </>
  );
}

export default ProductDetail;
