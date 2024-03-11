import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './customer/App.jsx'
import Account from './restaurant_account/Main.jsx'
import Pocket from './general/Pocket.jsx'
import Restaurant from './restaurant_account/restaurant/Restaurant.jsx'
import Menu from './restaurant_account/restaurant/Menu/Menu.jsx'
import RequestOrder from './restaurant_account/restaurant/RequestOrder/RequestOrder.jsx'
import RequestedOrder from './restaurant_account/restaurant/RequestedOrder/RequestedOrder.jsx'
import FinishedOrder from './restaurant_account/restaurant/FinishedOrder/FinishedOrder.jsx'
import RequestOrderDetail from './restaurant_account/restaurant/RequestOrder/RequestOrderDetail.jsx'
import RequestedOrderDetail from './restaurant_account/restaurant/RequestedOrder/RequestedOrderDetail.jsx'
import FinishedOrderDetail from './restaurant_account/restaurant/FinishedOrder/FinishedOrderDetail.jsx'
import LoginForm from './Authen.jsx'
//import Authen from './wwe.jsx'

import {
  createBrowserRouter,
  RouterProvider,
  Link,
} from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/restaurant_account/:account_id",
    element: <Account />,
  },
  {
    path : "/:account_id/pocket",
    element: <Pocket />,
  },
  {
    path: "/:restaurant_name",
    element: <Restaurant />,
  },
  {
    path: "/:restaurant_name/menu",
    element: <Menu />,
  },
  {
    path: "/:restaurant_name/request_order",
    element: <RequestOrder />,
  },
  {
    path: "/:restaurant_name/requested_order",
    element: <RequestedOrder />,
  },
  {
    path: "/:restaurant_name/finished_order",
    element: <FinishedOrder />,
  },
  {
    path: "/:restaurant_name/request_order/:order_id",
    element: <RequestOrderDetail />,
  },
  {
    path: "/:restaurant_name/requested_order/:order_id",
    element: <RequestedOrderDetail />,
  },
  {
    path: "/:restaurant_name/finished_order/:order_id",
    element: <FinishedOrderDetail />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
