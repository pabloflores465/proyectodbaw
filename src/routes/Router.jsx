import React from 'react'
import Layout from '../pages/Layout'
import ErrorPage from '../pages/ErrorPage'
import LandingPage from '../pages/LandingPage'
import CategoryPage from '../pages/CategoryPage'
import Products from '../pages/Products'
import ProductDetail from '../pages/ProductDetail'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import EditCategories from '../pages/EditCategories'
import Information from '../pages/Information'
import UsersList from '../pages/UsersList'
import OrderList from '../components/OrderList'
import AllCategories from '../pages/AllCategories'
import LoginComfirm from '../pages/LoginComfirm'
import Orders from '../pages/Orders'
import Forgotten from '../pages/Forgotten'


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
              path: "/categories/edit",
              element: <EditCategories/>
            },
            {
              path: "/error",
              element: <ErrorPage />,
            },
            {
              path: "/about/who",
              element: <Information/>,
            },
            {
              path: "/about/mission",
              element: <Information/>,
            },
            {
              path: "/about/vision",
              element: <Information/>,
            },
            {
              path: "/userList",
              element: <UsersList/>,
            },
            {
              path: "/orders",
              element: <Orders/>,
            },
            {
              path: "/orderlist/:userId",
              element: <OrderList/>
            },
            {
              path: "/allcategories",
              element: <AllCategories/>
            }
          ],
        },
        {
          path: "/loginComfirm/:token",
          element:<LoginComfirm/>
        },
        {
          path: "/passreset/:resettoken",
          element:<Forgotten/>
        },
      ]);

  return (
    <RouterProvider router={router} />
  )
}

export default Router