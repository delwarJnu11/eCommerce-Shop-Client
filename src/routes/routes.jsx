import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AdminPanel from "../pages/AdminPanel";
import CategoriesProducts from "../pages/CategoriesProducts";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProductDetails from "../pages/ProductDetails";
import SignUp from "../pages/SignUp";
import AllProducts from "../pages/admin/AllProducts";
import AllUsers from "../pages/admin/AllUsers";

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
