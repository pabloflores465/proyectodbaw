import React from 'react'
import Layout from '../pages/Layout'
import ErrorPage from '../pages/ErrorPage'
import LandingPage from '../pages/LandingPage'
import CategoryPage from '../pages/CategoryPage'
import Products from '../pages/Products'
import ProductDetail from '../pages/ProductDetail'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import EditCategories from '../pages/EditCategories'

function Router() {
    const router = createBrowserRouter([
        {
          path: "/",
          element: <Layout />,
          errorElement: <ErrorPage />,
          children: [
            {
              index: true,
              element: <LandingPage />,
            },
            {
              path: "/categories/:categoryId",
              element: <CategoryPage />,
            },
            {
              path: "/categories/:categoryId/:subcategoryId",
              element: <Products />,
            },
            {
              path: "/products/:id/",
              element: <ProductDetail />,
            },
            {
              path: "/categories",
              element: <EditCategories/>
            }
          ],
        },
        {
          path: "/error",
          element: <ErrorPage />,
        },
      ]);

  return (
    <RouterProvider router={router} />
  )
}

export default Router