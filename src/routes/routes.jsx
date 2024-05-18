import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AdminPanel from "../pages/AdminPanel";
import Cart from "../pages/Cart";
import CategoriesProducts from "../pages/CategoriesProducts";
import Checkout from "../pages/Checkout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProductDetails from "../pages/ProductDetails";
import SearchProducts from "../pages/SearchProducts";
import Shop from "../pages/Shop";
import SignUp from "../pages/SignUp";
import AllProducts from "../pages/admin/AllProducts";
import AllUsers from "../pages/admin/AllUsers";
import PaymentSuccess from "../pages/payment/PaymentSuccess";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/cart/checkout",
        element: <Checkout />,
      },
      {
        path: "/payment/success/:transactionId",
        element: <PaymentSuccess />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/search",
        element: <SearchProducts />,
      },
      {
        path: "/products/category/:categoryName",
        element: <CategoriesProducts />,
      },
      {
        path: "/products/:category/:id",
        element: <ProductDetails />,
      },
      {
        path: "/admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: "users",
            element: <AllUsers />,
          },
          {
            path: "products",
            element: <AllProducts />,
          },
        ],
      },
    ],
  },
]);
