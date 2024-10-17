import React from 'react'
import { Card, Container, Image} from 'react-bootstrap'

export default function NewProducts() {
    return(<Container style={{ overflowX: 'auto', whiteSpace: 'nowrap', padding: 10 }}>
    <div className="d-flex" style={{ gap: 10 }}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
        <Card
          className="translate-up mb-2 rounded-circle"
          style={{ minWidth: 200, flex: '0 0 auto', position: 'relative'}}
          key={index}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              padding: '5px',
              borderRadius: '5px',
            }}
          >
            <Card.Title style={{fontSize:30}}>Producto {item}</Card.Title>
          </div>
          <Image
            variant="top"
            src="hola.png"
            style={{ width: '300px', height: '300px' }}
            roundedCircle
          />
        </Card>
      ))}
    </div>
  </Container>)
}
