import React from "react";
import {
  Button,
  Dropdown,
  Form,
} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

export default function Search() {
  return (
    <>
      <Form className="d-flex w-100">
        <Dropdown autoClose={"outside"}>
          <Dropdown.Toggle
            variant="secondary"
            className="rounded-start-pill text-white ms-0"
          />
          <Dropdown.Menu className="pt-0">
            <Dropdown.Item className="d-flex justify-content-center bg-secondary rounded-top text-white">
              <strong>Search By</strong>
            </Dropdown.Item>
            <Form.Check type="checkbox" label="Categories" className="ms-2" />
            <Form.Check label={"Best Sellers"} className="ms-2" />
            <Form.Check label={"Name"} className="ms-2" />
            <Form.Check label={"Price"} className="ms-2" />
          </Dropdown.Menu>
        </Dropdown>
        <Form.Control
          id="search-input"
          type="search"
          placeholder="Search Products"
          className="d-flex rounded-end-pill me-2"
        />

        <Button className="bg-success text-white rounded-pill me-2 d-flex justify-content-center align-items-center" style={{border:'none'}}>
          <FaSearch className="me-1" /> Search
        </Button>
      </Form>
    </>
  );
}
