import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useParams } from 'react-router'
import AboutUS from '../components/AboutUs'
import "../customStyles/LoginComfirm.css"

function LoginComfirm() {
    const params = useParams()

  return (
    <>
    <div className='bg-image d-flex align-items-center justify-content-center full-height'>
    
    <Card style={{ width: 'auto', border: 'none' }} className='m-auto shadow'>
    <Card.Title className='d-flex justify-content-center bg-primary rounded-top text-white py-2'>Comfirm Login</Card.Title>
      <Card.Body>
        <Card.Img variant="center" src="/hiCat.webp" width='400px' height='250px' />
        <Card.Text className='my-2 d-flex align-text-center'>
            <strong>Hi, Please comfirm that you want to login.</strong>
        </Card.Text>
        <Button variant="secondary text-white w-100">Comfirm Login</Button>
      </Card.Body>
    </Card>
    </div>
    <AboutUS/>
    </>
  )
}

export default LoginComfirm