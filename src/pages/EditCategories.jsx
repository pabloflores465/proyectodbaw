import React, { useContext, useEffect } from 'react'
import { UserProfileContext } from '../context/UserProfileContext'
import ErrorPage from './ErrorPage'
import { useNavigate } from 'react-router'

function EditCategories() {
   const {userProfile} = useContext(UserProfileContext)
   const navigate = useNavigate()

   useEffect(() => {
    if (userProfile.rol !== 2 && userProfile.rol !== 3) {
      navigate('/error')
    }
  }, [userProfile, navigate])

  return (<>
    {userProfile.rol === 2 || userProfile.rol === 3 ? <>{console.log("kenny bell")}</>:null}
    </>
  )
}

export default EditCategories