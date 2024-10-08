import React, { useContext, useRef, useState } from "react";
import { Button, Card, Dropdown, Image, OverlayTrigger } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { WindowWidthContext } from "../App";

export default function Cart() {
  const [showProducts, setShowProducts] = useState(false);
  const { windowWidth } = useContext(WindowWidthContext);

  const target = useRef(null);

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle className="text-white">
          <FaShoppingCart size={"2rem"} />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <div className="container" >
            <div className="d-flex flex-column">
              <div className="d-flex align-items-center border-bottom mb-2">
                <Image src="/hola.png" rounded height={80} width={80}  className="me-2 mb-2"/>
                <div className="d-flex flex-column">
                  <strong>Name: title</strong>
                  <strong>Description:</strong>
                  <div className='w-80 border rounded ps-1 pe-1' style={{ wordBreak: 'break-word', whiteSpace: 'normal', maxHeight: '100px', width:'200px' ,overflowY: 'auto' }}> 
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
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
