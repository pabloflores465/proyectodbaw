import React from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

export default function Search() {
  return (
    <>
      <Form className="d-flex w-100">
        <Dropdown autoClose={"outside"}>
          <Dropdown.Toggle
            variant="secondary"
            className="rounded-start-pill ms-0 text-white"
          >
            Filter{" "}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <div className="container">
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center border-bottom mb-2">
                  <Form.Check className="me-2" label="Categories" />
                </div>
                <div className="d-flex align-items-center border-bottom mb-2">
                  <Form.Check className="me-2" label="Best Sellers" />
                </div>
                <div className="d-flex align-items-center border-bottom mb-2">
                  <Form.Check className="me-2" label="Price" />
                </div>
                <div className="d-flex align-items-center">
                  <Form.Check className="me-2" label="Name" />
                </div>
              </div>
            </div>
          </Dropdown.Menu>
        </Dropdown>
        <Form.Control
          id="search-input"
          type="search"
          placeholder="Search Products"
          className="d-flex rounded-end-pill me-2"
        />

        <Button
          className="bg-success text-white rounded-pill me-2 d-flex justify-content-center align-items-center"
          style={{ border: "none" }}
        >
          <FaSearch className="me-1" /> Search
        </Button>
      </Form>
    </>
  );
}
