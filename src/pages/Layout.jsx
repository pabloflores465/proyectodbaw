import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Nav,
  Navbar,
  Button,
  Form,
  Offcanvas,
  Dropdown,
  OverlayTrigger,
  Card,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import { Outlet } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaSearch,
  FaShoppingCart,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { UserNameContext, WindowWidthContext } from "../App";
import { RiLogoutBoxFill } from "react-icons/ri";
import { IoMdPersonAdd } from "react-icons/io";
import { MdPets } from "react-icons/md";
import { FaArrowsDownToPeople } from "react-icons/fa6";
import Login from "./Login";
import Signup from "./Signup";
import { IoCloseSharp } from "react-icons/io5";
import Profile from "./Profile";
import AboutUS from "../components/AboutUs";
import Navigation from "../components/Navigation";


export default function Layout() {

  return (
    <>
      <Navigation/>
      
      <Outlet />
      
      <AboutUS/>      
    </>
  );
}
