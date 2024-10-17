import React from 'react'
import FeaturedProducts from '../components/FeaturedProducts'
import BestSellers from '../components/BestSellers'
import Products from './Products'
import LowStockProducts from '../components/LowStockProducts'
import NewProducts from '../components/NewProducts'

function LandingPage() {
  return (
    <>
        <FeaturedProducts/>
        <BestSellers/>
        <LowStockProducts/>
        <NewProducts/>
    </>
  )
}

export default LandingPage