import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import CartProvider from "./providers/CartProvider.jsx";
import ProductProvider from "./providers/ProductProvider.jsx";
import UserProvider from "./providers/UserProvider.jsx";
import { router } from "./routes/routes.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <ProductProvider>
        <CartProvider>
          <RouterProvider router={router} />
          <ToastContainer />
        </CartProvider>
      </ProductProvider>
    </UserProvider>
  </React.StrictMode>
);
