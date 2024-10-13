import React from "react";
import Spinner from 'react-bootstrap/Spinner';

export default function LoadingState() {
  return (
    <div className="d-flex justify-content-center align-items-center mb-4 text-success">
      <Spinner animation="border" role="status" className="me-2" />
      loading ...
    </div>
  );
}
