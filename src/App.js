import logo from './logo.svg';
import './App.css';
import { Link, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import React from 'react';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path:'/',
    element: <Login/>,
    errorElement:  <ErrorPage/>
  },
  {
    path: '/home',
    element: <Home/>
  }
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
