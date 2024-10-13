import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';

function ErrorPage() {
  const navigate = useNavigate()
  useEffect(() => {
    const handlePopState = (event) => {
      if (window.location.pathname === '/error') {
        navigate('/')
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
  
  return (
    <>
        <h1>Sorry, page not found</h1>
        
    </>
  )
}

export default ErrorPage