import React from "react";
import { Button, Image } from "react-bootstrap";
import { IoCloseSharp } from "react-icons/io5";

function ProductDetail() {
  return (
    <>
      <div className="d-flex flex-row">
        <div className="container">
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center border-bottom mb-2">
              <Image
                src="/hola.png"
                rounded
                height={720}
                width={1280}
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
  );
}

export default ProductDetail;
