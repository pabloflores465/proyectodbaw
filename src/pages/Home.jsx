import React, { useContext } from 'react'
import Navigation from '../components/Navigation'
import { useParams } from 'react-router'
import BestSellers from '../components/BestSellers'
import { UserNameContext } from '../App'

function Home() {
    const params = useParams();
    const { userName } = useContext(UserNameContext)
    console.log(userName)
  return (
    <>
        hola
        
    </>
  )
}

export default Home