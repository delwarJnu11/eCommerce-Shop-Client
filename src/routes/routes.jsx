import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../components/protectedRoute/ProtectedRoute";
import AdminPanel from "../pages/AdminPanel";
import Cart from "../pages/Cart";
import CategoriesProducts from "../pages/CategoriesProducts";
import Checkout from "../pages/Checkout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import OrderHistory from "../pages/OrderHistory";
import ProductDetails from "../pages/ProductDetails";
import SearchProducts from "../pages/SearchProducts";
import Shop from "../pages/Shop";
import SignUp from "../pages/SignUp";
import TopDiscountProductsPage from "../pages/TopDiscountProductsPage";
import TrackOrder from "../pages/TrackOrder";
import AllProducts from "../pages/admin/AllProducts";
import AllUsers from "../pages/admin/AllUsers";
import Orders from "../pages/admin/Orders";
import PaymentFailed from "../pages/payment/PaymentFailed";
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
        element: <ProtectedRoute element={<Cart />} />,
      },
      {
        path: "/cart/checkout",
        element: <ProtectedRoute element={<Checkout />} />,
      },
      {
        path: "/payment/success/:transactionId",
        element: <PaymentSuccess />,
      },
      {
        path: "/payment/fail/:transactionId",
        element: <PaymentFailed />,
      },
      {
        path: "/shop",
        element: <ProtectedRoute element={<Shop />} />,
      },
      {
        path: "/products/top-discount",
        element: <TopDiscountProductsPage />,
      },
      {
        path: "/search",
        element: <SearchProducts />,
      },
      {
        path: "/track/order/:email",
        element: <ProtectedRoute element={<TrackOrder />} />,
      },
      {
        path: "/orders/history/:email",
        element: <ProtectedRoute element={<OrderHistory />} />,
      },
      {
        path: "/products/category/:categoryName",
        element: <CategoriesProducts />,
      },
      {
        path: "/products/:category/:id",
        element: <ProtectedRoute element={<ProductDetails />} />,
      },
      {
        path: "/admin-panel",
        element: <ProtectedRoute element={<AdminPanel />} />,
        children: [
          {
            path: "users",
            element: <AllUsers />,
          },
          {
            path: "products",
            element: <AllProducts />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
        ],
      },
    ],
  },
]);
