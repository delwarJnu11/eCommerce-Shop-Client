import { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { actions } from "../../actions";
import { api } from "../../api";
import { useProduct } from "../../hooks/useProduct";
import CategorizedProductCard from "../product/CategorizedProductCard";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const CategorizedProducts = ({ productCategory, heading }) => {
  const { state, dispatch } = useProduct();
  const navigate = useNavigate();
  const loadingList = new Array(4).fill(null);
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

  const handleProductDetails = (e, id) => {
    if (!e.target.closest("button")) {
      navigate(`/products/${productCategory}/${id}`);
    }
  };
  return (
    <div className="my-6">
      <h2 className="text-md md:text-[22px] text-gray-700 font-semibold block">
        {heading}
      </h2>
      <Carousel
        responsive={responsive}
        infinite={true}
        keyBoardControl={true}
        customTransition="transform 500ms ease-in-out"
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        rewindWithAnimation={true}
        // autoPlay={true}
        // autoPlaySpeed={5000}
        className="my-4"
      >
        {state?.loading
          ? loadingList.map((el, index) => (
              <div className="mx-2" key={index}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="w-full h-64 object-scale-down object-fit-scale bg-slate-300 p-2 animate-pulse"></div>
                  <div className="p-4 w-full">
                    <h2 className="text-gray-800 font-bold text-lg mb-2 text-ellipsis line-clamp-1 bg-slate-300 p-2 animate-pulse w-full"></h2>
                    <p className="text-gray-600 text-sm bg-slate-300 p-2 animate-pulse w-full"></p>
                    <div className="flex items-center gap-2 mt-2 w-full">
                      <p className="text-orange-700 text-base font-bold mt-2 bg-slate-300 p-2 animate-pulse w-full"></p>
                      <p className="text-gray-600 line-through bg-slate-300 p-2 animate-pulse w-full"></p>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <button className="mt-4  text-white py-2 px-4 rounded-lg  focus:outline-none bg-slate-300 p-2 animate-pulse w-full"></button>
                      <button className="mt-4  text-white py-2 px-4 rounded-lg  focus:outline-none bg-slate-300 p-2 animate-pulse w-full"></button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : Object.keys(state.productsByCategory).map(
              (category) =>
                category === productCategory &&
                state?.productsByCategory[productCategory]?.map((product) => (
                  <CategorizedProductCard
                    key={product._id}
                    product={product}
                    productDetails={handleProductDetails}
                  />
                ))
            )}
      </Carousel>
    </div>
  );
};

export default CategorizedProducts;
