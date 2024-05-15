import { useEffect } from "react";
import { toast } from "react-toastify";
import { actions } from "../actions";
import { api } from "../api";
import Banner from "../components/home/Banner";
import CategorizedProducts from "../components/home/CategorizedProducts";
import CategoryList from "../components/home/CategoryList";
import { useCart } from "../hooks/useCart";

const Home = () => {
  const { dispatch } = useCart();

  useEffect(() => {
    const fetchCartData = async () => {
      dispatch({ type: actions.cart.CART_DATA_FETCHING });
      try {
        const response = await api.get("/cart-products", {
          withCredentials: true,
        });
        if (response.data.success) {
          dispatch({
            type: actions.cart.CART_DATA_FETCHED,
            data: response.data.cart,
          });
        }
        if (response.data.error) {
          toast.error(response.data.message);
        }
      } catch (error) {
        dispatch({
          type: actions.cart.CART_DATA_FETCHING_ERROR,
          error: error.response.data.message,
        });
      }
    };
    fetchCartData();
  }, [dispatch]);

  return (
    <div className="container mx-auto py-4">
      <CategoryList />
      <Banner />
      <CategorizedProducts productCategory="airpod" heading="Top Airpodes" />
      <CategorizedProducts productCategory="mobile" heading="Mobile Phones" />
      <CategorizedProducts
        productCategory="camera"
        heading="Camera & Tripod's"
      />
      <CategorizedProducts productCategory="television" heading="Television" />
      <CategorizedProducts productCategory="earphone" heading="Earphones" />
      <CategorizedProducts productCategory="watch" heading="Watches" />
      <CategorizedProducts productCategory="trimmer" heading="Trimmers" />
      <CategorizedProducts productCategory="speaker" heading="Speakers" />
      <CategorizedProducts productCategory="mouse" heading="Mouse" />
      <CategorizedProducts productCategory="printer" heading="Printers" />
      <CategorizedProducts
        productCategory="refrigerator"
        heading="Refrigerators"
      />
      <CategorizedProducts productCategory="processor" heading="Processor's" />
    </div>
  );
};
export default Home;
