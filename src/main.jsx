import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import './index.css'

import {router} from './config/routes';
import { RouterProvider } from 'react-router-dom';
import UserProvider from './context/UserContext';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);
