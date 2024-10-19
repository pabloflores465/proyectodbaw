import React, { useEffect, useState } from 'react'
import FeaturedProducts from '../components/FeaturedProducts'
import BestSellers from '../components/BestSellers'
import LowStockProducts from '../components/LowStockProducts'
import NewProducts from '../components/NewProducts'
import Qr from '../components/Qr'
import { useLocation, useParams } from 'react-router'

function LandingPage() {
  const location = useLocation()
  const params = useParams()

  const [showQr, setShowQr] = useState(false)
  console.log(params)

  useEffect(()=>{
    if(location.pathname === `/categories/${params.categoryId}/${params.subcategoryId}`){
      setShowQr(true)
    }
    else {
      setShowQr(false)
    }
  },[location,params])



  return (
    <>
        <FeaturedProducts/>
        <BestSellers/>
        <LowStockProducts/>
        <NewProducts/>
        <Qr show={showQr}/>
    </>
  )
}

export default LandingPage