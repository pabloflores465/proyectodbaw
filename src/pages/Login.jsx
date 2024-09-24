import React from "react";
import { Button, Card, Form } from "react-bootstrap";

function Login() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Card className="text-white shadow" style={{ width: "30rem" }}>
          <Card.Title className="bg-primary rounded-top p-3 text-center">
            Please Log In With Your Username and Password
          </Card.Title>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label className="text-success">Username</Form.Label>
                <Form.Control required placeholder="John Doe" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-success">Password</Form.Label>
                <Form.Control required placeholder="Password#123" />
                <Form.Text>Forgot Password?</Form.Text>
              </Form.Group>
            </Form>
            <Button variant="secondary text-white rounded-pill w-100" type="submit">
                Submit
            </Button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default Login;
