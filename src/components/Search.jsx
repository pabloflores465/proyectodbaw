import React, { useContext, useEffect, useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import { FaFilter, FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import { UserProfileContext } from "../context/UserProfileContext";
import postSearchProducts from "../conections/postSearchProducts";
import { SearchProductsContext } from "../context/SearchProductsContext";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Search() {
  const {userProfile} = useContext(UserProfileContext)
  const [searchTerm, setSearchTerm] = useLocalStorage("searchTerm", "");
  const navigate = useNavigate();
  const location = useLocation();
  const [previousPath, setPreviousPath] = useState("/");

  const CustomToggle = React.forwardRef(({ onClick }, ref) => (
    <Button
      variant="secondary"
      className="rounded-start-pill ms-0 text-white"
      style={{ whiteSpace: "nowrap" }}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <FaFilter />
    </Button>
  ));

  const {setSearchProducts} = useContext(SearchProductsContext)
  const [checkedFields, setCheckedFields] = useLocalStorage("checkedF", [false, false, false, false]);

  let handleSearch = () => {
    if (searchTerm !== "") {
      setPreviousPath(location.pathname);
      navigate(`/search/${searchTerm}`);
      console.log('Filters:', checkedFields);
      console.log('Search Term:', searchTerm);
      postSearchProducts(setSearchProducts, checkedFields, searchTerm)
    }
  };

  
  let employee = userProfile.rol === 2 ? true : false;
  let admin = userProfile.rol === 3 ? true : false;



  return (
    <>
      <Form className="d-flex w-100" onSubmit={(e) => e.preventDefault()}>
        <Dropdown autoClose={"outside"} className="ms-2">
          <Dropdown.Toggle as={CustomToggle} />
          <Dropdown.Menu>
            <div className="container">
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center border-bottom mb-2">
                  <Form.Check
                    className="me-2"
                    label="Name"
                    defaultChecked={checkedFields[0]}
                    onChange={(e) => {
                      let temp = [...checkedFields];
                      temp[0] = e.target.checked;
                      setCheckedFields(temp);
                    }}
                  />
                </div>
                <div className="d-flex align-items-center border-bottom mb-2">
                  <Form.Check
                    className="me-2"
                    label="Description"
                    defaultChecked={checkedFields[1]}
                    onChange={(e) => {
                      let temp = [...checkedFields];
                      temp[1] = e.target.checked;
                      setCheckedFields(temp);
                    }}
                  />
                </div>
                <div className={`d-flex align-items-center ${employee || admin ? 'border-bottom mb-2':''}`}>
                  <Form.Check
                    className="me-2"
                    label="Categories"
                    defaultChecked={checkedFields[2]}
                    onChange={(e) => {
                      let temp = [...checkedFields];
                      temp[2] = e.target.checked;
                      setCheckedFields(temp);
                    }}
                  />
                </div>                
                <div className="d-flex align-items-center">
                   { employee || admin ? (
                    <Form.Check
                      className="me-2"
                      label="Disabled"
                      defaultChecked={checkedFields[3]}
                      onChange={(e) => {
                        let temp = [...checkedFields];
                        temp[3] = e.target.checked;
                        setCheckedFields(temp);
                        }}
                    />):null
                    }            
                </div>
              </div>
            </div>
          </Dropdown.Menu>
        </Dropdown>
        <Form.Control
          id="search-input"
          type="search"
          placeholder="Search Products"
          className="d-flex rounded-0"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (e.target.value === "") {
              navigate(previousPath);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <Button
          className="bg-success text-white rounded-end-pill me-2 d-flex justify-content-center align-items-center"
          style={{ border: "none" }}
          onClick={handleSearch}
        >
          <FaSearch className="me-1" />
        </Button>
      </Form>
    </>
  );
}