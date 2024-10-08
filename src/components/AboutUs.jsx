import React, { useContext } from 'react'
import { WindowWidthContext } from '../App'
import { Card, Col, Row } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaPhone, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export default function AboutUS() {
    const { windowWidth } = useContext(WindowWidthContext);

  return (
    <>
    {windowWidth > 800 ? (
        <Card className="bg-primary w-100 text-white text-center rounded-0 shadow">
          <Row>
            <Col>
              <strong>About D&P Petshop</strong>
            </Col>
            <Col>
              <strong>Social Media</strong>
            </Col>
            <Col>
              <strong>Contact Us</strong>
            </Col>
            <Col>
              <strong>About</strong>
            </Col>
          </Row>
          <Row>
            <Col>¿Who are We?</Col>
            <Col>
              <FaFacebook /> Facebook
            </Col>
            <Col>
              <FaWhatsapp /> Whatsapp
            </Col>
            <Col>Privacy Policy</Col>
          </Row>
          <Row>
            <Col>Mision</Col>
            <Col>
              <FaInstagram /> Instagram
            </Col>
            <Col>
              <FaPhone /> +502 1234-4321
            </Col>
            <Col>Devs: Pablo Flores & Nohel Estrada</Col>
          </Row>
          <Row>
            <Col>Vision</Col>
            <Col>
              <FaTiktok /> Tik Tok
            </Col>
            <Col>
              <MdEmail /> example@gmail.com
            </Col>
            <Col>License: GPLV3</Col>
          </Row>
        </Card>
      ) : (
        <Card className="bg-primary w-100 text-white text-center rounded-0 shadow">
          <Row>
            <Col>
              <strong>About D&P Petshop</strong>
            </Col>
          </Row>
          <Row>
            <Col>¿Who are We?</Col>
          </Row>
          <Row>
            <Col>Mision</Col>
          </Row>
          <Row>
            <Col>Vision</Col>
          </Row>
          <Row>
            <Col>
              <strong>Social Media</strong>
            </Col>
          </Row>
          <Row>
            <Col>
              <FaFacebook /> Facebook
            </Col>
          </Row>
          <Row>
            <Col>
              <FaInstagram /> Instagram
            </Col>
          </Row>
          <Row>
            <Col>
              <FaTiktok /> Tik Tok
            </Col>
          </Row>
          <Row>
            <Col>
              <strong>Contact Us</strong>
            </Col>
          </Row>
          <Row>
            <Col>
              <FaWhatsapp /> Whatsapp
            </Col>
          </Row>
          <Row>
            <Col>
              <FaPhone /> +502 1234-4321
            </Col>
          </Row>
          <Row>
            <Col>
              <MdEmail /> example@gmail.com
            </Col>
          </Row>
          <Row>
            <Col>
              <strong>About</strong>
            </Col>
          </Row>
          <Row>
            <Col>Privacy Policy</Col>
          </Row>
          <Row>
            <Col>Devs: Pablo Flores & Nohel Estrada</Col>
          </Row>
          <Row>
            <Col>License: GPLV3</Col>
          </Row>
        </Card>
      )}
      </>
  )
}
