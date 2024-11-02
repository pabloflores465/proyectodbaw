import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Thanks = () => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/'); // Route to redirect users for more shopping
  };

  return (
    <Container className="py-5 text-center">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4 shadow">
            <Card.Body>
              <h1 className="mb-4">Thank You for Your Purchase!</h1>
              <Card.Text>
                We appreciate your trust in us and hope you enjoy your purchase. If you have any questions or concerns, feel free to reach out to us.
              </Card.Text>
              <Card.Text className="mt-3">
                A confirmation email has been sent to your inbox.
              </Card.Text>
              <Button variant="secondary text-white rounded-pill" onClick={handleContinueShopping} className="mt-4">
                Continue Shopping
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Thanks;
