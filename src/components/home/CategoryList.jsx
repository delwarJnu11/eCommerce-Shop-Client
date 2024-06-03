import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { GoLink } from "react-icons/go";
import { Link } from "react-router-dom";
import SwiperCore from "swiper/core";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { actions } from "../../actions";
import useAxios from "../../hooks/useAxios";
import { useProduct } from "../../hooks/useProduct";
import Heading from "../shared/Heading";
SwiperCore.use([Pagination, Navigation, Autoplay]);

const CategoryList = () => {
  const { state, dispatch } = useProduct();
  const swiperRef = useRef(null);
  const { api } = useAxios();

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

  const categoryLoading = new Array(12).fill(null);

  useEffect(() => {
    const fetchCategories = async () => {
      dispatch({ type: actions.product.PRODUCT_DATA_FETCHING });
      try {
        const response = await api.get("/products/categories");
        if (response.data.success) {
          dispatch({
            type: actions.product.ALL_CATEGORIES_DATA_FETCHED,
            data: response.data.data,
          });
        }
      } catch (error) {
        dispatch({
          type: actions.product.PRODUCT_DATA_FETCHING_ERROR,
          error: error.message,
        });
      }
    };
    fetchCategories();
  }, [dispatch, api]);

  if (state?.error) {
    return <p>{state.error}</p>;
  }

  return (
    <>
      <Heading value={"Categories"} />
      <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar-none">
        {state?.loading === true
          ? categoryLoading.map((el, index) => (
              <div
                className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse blink-animation"
                key={index}
              ></div>
            ))
          : state?.categories && (
              <Swiper
                ref={swiperRef}
                spaceBetween={30}
                slidesPerView={6}
                autoplay={{ delay: 7000 }}
                loop={true}
                speed={2500}
                effect="fade"
                className="mySwiper"
              >
                {state.categories.map((category) => (
                  <SwiperSlide key={category._id}>
                    <Link
                      to={`/products/category/${category?.categoryName}`}
                      className="min-w-[190px] flex flex-wrap flex-col items-center space-y-1 group relative cursor-pointer gap-6"
                    >
                      <motion.div
                        className="relative"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ ease: "easeOut", duration: 2 }}
                      >
                        <div className="w-32 h-32 bg-slate-200 rounded-md">
                          <img
                            src={category.productImages[0]}
                            alt={category.label}
                            className="w-full h-full object-scale-down rounded-lg mix-blend-multiply p-4"
                          />
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center rounded-lg transition duration-300">
                          <GoLink
                            className="text-white opacity-0 group-hover:opacity-100 transition duration-300"
                            size={24}
                          />
                        </div>
                      </motion.div>
                      <span className="text-sm font-medium capitalize">
                        {category.categoryName}
                      </span>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
      </div>
    </>
  );
};
export default CategoryList;
