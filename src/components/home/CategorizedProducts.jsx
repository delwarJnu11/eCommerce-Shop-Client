import { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { actions } from "../../actions";
import { api } from "../../api";
import { useProduct } from "../../hooks/useProduct";
import ProductCardLoader from "../loader/ProductCardLoader";
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
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
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
        {state?.loading === true
          ? loadingList.map((el, index) => <ProductCardLoader key={index} />)
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
