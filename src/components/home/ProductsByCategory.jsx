import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SwiperCore from "swiper/core";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { actions } from "../../actions";
import { api } from "../../api";
import { useProduct } from "../../hooks/useProduct";
import { useTheme } from "../../hooks/useTheme";
import ProductCard from "../product/homeProductCard/ProductCard";

SwiperCore.use([Pagination, Navigation, Autoplay]);

const ProductsByCategory = ({
  bannerURL,
  dealType,
  title,
  subTitle,
  productCategory,
  heading,
}) => {
  const { state, dispatch } = useProduct();
  const swiperRef = useRef(null);
  const { darkMode } = useTheme();
  //manage swiper autoplay
  useEffect(() => {
    const swiper = swiperRef?.current?.swiper;

    if (swiper) {
      swiper?.autoplay?.start();
    }

    return () => {
      if (swiper) {
        swiper?.autoplay?.stop();
      }
    };
  }, []);
  //fetch product by category name
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      dispatch({ type: actions.product.PRODUCT_DATA_FETCHING });
      try {
        const response = await api.get(`/products/category/${productCategory}`);
        if (response?.data?.error) {
          toast.error(response?.data?.message);
        }
        if (response?.data?.success) {
          dispatch({
            type: actions.product.PRODUCTS_BY_CATEGORY_DATA_FETCHED,
            data: response?.data?.products,
            category: productCategory,
          });
        }
      } catch (error) {
        dispatch({
          type: actions.product.PRODUCT_DATA_FETCHING_ERROR,
          error: error.message,
        });
      }
    };
    fetchProductsByCategory();
  }, [dispatch, productCategory]);

  // Get the products for the specific category
  const products = state?.productsByCategory[productCategory] || [];

  // Split products into chunks of 4
  const productChunks = [];
  for (let i = 0; i < products.length; i += 4) {
    productChunks.push(products.slice(i, i + 4));
  }
  return (
    <div className="flex flex-col md:flex-row justify-center gap-4 my-16">
      <Link
        to={`/products/category/${productCategory}`}
        style={{
          background: `url(${bannerURL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-full md:w-1/3 h-60 md:h-auto p-6 text-center rounded-lg"
      >
        <button className="text-[12px] font-[600] leading-[15px] bg-[#C40C0C] text-white uppercase px-5 py-2 rounded-tr-lg rounded-br-lg rounded-bl-lg mb-4">
          {dealType}
        </button>
        <h2
          className={
            productCategory === "television" || productCategory === "speaker"
              ? "text-3xl font-bold text-white my-2"
              : "text-3xl font-bold text-[#1f1f1f] my-2"
          }
        >
          {title}
        </h2>
        <p
          className={
            productCategory === "television" || productCategory === "speaker"
              ? "text-lg text-[#ece9e9] uppercase font-medium"
              : "text-lg text-[#353535] uppercase font-medium"
          }
        >
          {subTitle}
        </p>
      </Link>

      <div className="w-full md:w-2/3">
        <h2
          className={`mb-10 border-b pb-6 font-bold text-3xl tracking-wider ${
            darkMode ? "text-white" : "text-[#414141]"
          }`}
        >
          {heading}
        </h2>
        <Swiper
          ref={swiperRef}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
          speed={4000}
          className="mySwiper"
        >
          {productChunks.map((chunk, index) => (
            <SwiperSlide key={index}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {chunk.map((product) => (
                  <div
                    key={product._id}
                    className="flex flex-col items-center space-y-1 group relative cursor-pointer gap-6"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
export default ProductsByCategory;
