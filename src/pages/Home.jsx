import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { actions } from "../actions";
import { api } from "../api";
import Banner from "../components/home/Banner";
import CategoryList from "../components/home/CategoryList";
import NewArrivals from "../components/home/NewArrivals";
import OurBrands from "../components/home/OurBrands";
import ProductsByCategory from "../components/home/ProductsByCategory";
import TopDeal from "../components/home/TopDeal";
import TopDiscountProducts from "../components/home/TopDiscountProducts";
import useFetchCartProducts from "../hooks/useFetchCartProducts";
import { useProduct } from "../hooks/useProduct";

const Home = () => {
  const { dispatch } = useProduct();
  const { fetchCartProducts, cart } = useFetchCartProducts();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  useEffect(() => {
    if (cart.length) {
      fetchCartProducts();
    }
  }, [fetchCartProducts, cart.length]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products", { withCredentials: true });
        if (response?.data?.success) {
          dispatch({
            type: actions.product.ALL_PRODUCTS_DATA_FETCHED,
            data: response.data.products,
          });
        }
      } catch (error) {
        dispatch({
          type: actions.product.PRODUCT_DATA_FETCHING_ERROR,
          error: error.message,
        });
      }
    };
    fetchProducts();
  }, [dispatch]);

  return (
    <div className="container mx-auto">
      <>
        <Banner />
        <CategoryList />
        <TopDeal />
        <OurBrands />
        <NewArrivals />
        <TopDiscountProducts />
        <ProductsByCategory
          bannerURL={"https://i.ibb.co/dGzv0hP/mobile-banner.jpg"}
          dealType={"Month Deals"}
          title={"Now 2000tk OFF"}
          subTitle={"Today's Super Offer"}
          productCategory="mobile"
          heading="Smartphones & Tablets"
        />
        <ProductsByCategory
          bannerURL={"https://i.ibb.co/dM7L54t/computer-banner.jpg"}
          dealType={"New Product"}
          title={"30% Off Or More"}
          subTitle={"FREE DELIVERY ON ALL ORDER"}
          productCategory="television"
          heading="Televisions & Computers"
        />
        <ProductsByCategory
          bannerURL={"https://i.ibb.co/gR9h95Z/speaker-banner.jpg"}
          dealType={"BIG SALE"}
          title={"Speaker Deal"}
          subTitle={"UPTO 30% Off"}
          productCategory="speaker"
          heading="Speaker"
        />
      </>
    </div>
  );
};
export default Home;
