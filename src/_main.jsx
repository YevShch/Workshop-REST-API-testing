import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter, RouterProvider
} from "react-router-dom";
import App from "./App";
import CategoryList from './CategoryList';
import Product from './Product';
import './_index.css';

export const menuPaths = [
  { path: '/kategori/*', element: <CategoryList /> },
  { path: '/produkt/:code/*', element: <Product /> }
];

const router = createBrowserRouter([
  { path: "/", element: <App />, children: menuPaths },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);