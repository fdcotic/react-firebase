import { createBrowserRouter } from "react-router-dom";

import LayoutRoot from "../layout/LayoutRoot";
import Private from "../layout/LayoutPrivate";

import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutRoot />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/dashboard",
        element: <Private />,
        children: [{ index: true, element: <Dashboard /> }],
      },
    ],
  },
]);