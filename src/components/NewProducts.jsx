import React from 'react'
import { Button } from 'react-bootstrap'
import { FaPlusCircle } from 'react-icons/fa'

export default function NewProducts() {
    let bool = 1
  return (
    <Button className={bool === 1 ? 'bg-secondary rounded-pill text-white ms-auto pt-0 pb-0':null}><FaPlusCircle size={'1.5rem'}/> Add New Products</Button>
  )
}
