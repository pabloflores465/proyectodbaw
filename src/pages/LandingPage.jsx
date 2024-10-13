import React from 'react'
import FeaturedProducts from '../components/FeaturedProducts'
import BestSellers from '../components/BestSellers'
import Products from './Products'

function LandingPage() {
  return (
    <>
        <FeaturedProducts/>
        <BestSellers/>
        <Products/>
    </>
  )
}

export default LandingPage