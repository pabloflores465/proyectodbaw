import React from 'react'
import { Card, Carousel, Container } from 'react-bootstrap'

export default function BestSellers() {
  return (
    <Container style={{overflowX:'auto', whiteSpace: 'nowrap', padding:10}}>
    <div className="d-flex" style={{gap:10}}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
        <Card style={{minWidth:200, flex: '0 0 auto',}} key={index}>
          <Card.Img variant="top" src={`hola.png`} style={{ width: '300px', height: '300px' }} />
          {/* Puedes agregar más detalles si lo necesitas */}
        </Card>
      ))}
    </div>
  </Container>
  )
}
