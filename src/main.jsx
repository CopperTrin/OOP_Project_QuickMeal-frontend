import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './customer/App.jsx'
import Menu from './restaurant_account/restaurant/Menu.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:restaurant",
    element: <Menu />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
