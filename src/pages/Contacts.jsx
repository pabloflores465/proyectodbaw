import React from 'react';
import { Container, Row, Col, Form, Button, Card, Image } from 'react-bootstrap';

const Contacts = () => {
  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Contact Us</h1>
          <h4>Contact Information</h4>
          <Card className="mb-3 p-2">

            <Image src="/callUs.png" height="250px" width="250px" className='mx-auto' roundedCircle/>
            <Card.Body>
              <Card.Text>
                <strong>Address:</strong> 102, Finca Santa Isabel, Guatemala
              </Card.Text>
              <Card.Text>
                <strong>Phone:</strong> +502 5912620
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> example@gmail.com
              </Card.Text>
            </Card.Body>
          </Card>
    </Container>
  );
};

export default Contacts;
