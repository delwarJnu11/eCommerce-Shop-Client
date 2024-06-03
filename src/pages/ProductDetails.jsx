import moment from "moment";
import { useEffect, useState } from "react";
import { FaCartPlus, FaUser } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { actions } from "../actions";
import ProductDetailsLoader from "../components/loader/ProductDetailsLoader";
import ReviewLoader from "../components/loader/ReviewLoader";
import RelatedProducts from "../components/product/RelatedProducts";
import useAxios from "../hooks/useAxios";
import useFetchCartProducts from "../hooks/useFetchCartProducts";
import { useProduct } from "../hooks/useProduct";
import { useTheme } from "../hooks/useTheme";
import { useUser } from "../hooks/useUser";
import { convertNumberToBDT } from "../utils/convertNumberToBDT";

const ProductDetails = () => {
  const { darkMode } = useTheme();
  const { id } = useParams();
  const { state, dispatch } = useProduct();
  const { state: userState } = useUser();
  const { fetchCartProducts, cart } = useFetchCartProducts();
  const [displayImage, setDisplayImage] = useState("");
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const { api } = useAxios();

  useEffect(() => {
    const fetchSingleProduct = async () => {
      dispatch({ type: actions.product.PRODUCT_DATA_FETCHING });
      try {
        const response = await api.get(`/products/${id}`);
        if (response?.data?.success) {
          dispatch({
            type: actions.product.PRODUCT_DATA_FETCHED,
            data: response?.data?.product,
          });
          setDisplayImage(response?.data?.product?.productImages[0]);
          if (cart.length) {
            fetchCartProducts();
          }
        }
        if (response?.data?.error) {
          toast.error(response.data.message);
        }
      } catch (error) {
        dispatch({
          type: actions.product.PRODUCT_DATA_FETCHING_ERROR,
          error: error.message,
        });
      }
    };
    fetchSingleProduct();
  }, [dispatch, id, fetchCartProducts, cart.length, api]);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/reviews/${id}/review`, {
          withCredentials: true,
        });
        if (response.data.success) {
          setLoading(false);
          setReviews(response.data.reviews);
        }
        if (response.data.error) {
          setLoading(false);
          setReviews([]);
        }
      } catch (error) {
        setLoading(false);
        setReviews([]);
      }
    };
    fetchReviews();
  }, [id, api]);
  const product = state?.product;

  const handleZoomImage = (e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();

    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setZoomImageCoordinate({
      x,
      y,
    });
  };

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  // handle Add to Cart
  const handleAddToCart = async (productId) => {
    try {
      const response = await api.post(
        "/product/add-to-cart",
        { productId },
        { withCredentials: true }
      );
      if (response.data.success) {
        fetchCartProducts();
        toast.success(response.data.message);
      }

      if (response.data.error) {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      navigate("/login");
    }
  };

  {
    loading === true && reviews.length === 0 && <ReviewLoader />;
  }
  //if error exists
  if (state?.error) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-red-600 p-4 text-md">{state?.error}</p>
      </div>
    );
  }

  const loadingStateImages = new Array(4).fill(null);

  return (
    <>
      {state?.loading === true ? (
        <ProductDetailsLoader loadingStateImages={loadingStateImages} />
      ) : (
        <div className="container mx-auto flex gap-6 overflow-hidden py-6">
          {/* image section */}
          <div className="w-[50%] flex sm:flex-col md:flex-row gap-4 overflow-hidden">
            <div className="w-1/6 md:h-[350px] flex flex-col">
              {product?.productImages?.map((image) => (
                <div
                  key={image}
                  className="w-20 h-20 my-1 cursor-pointer bg-white mx-auto"
                  onClick={() => setDisplayImage(image)}
                >
                  <img
                    src={image}
                    alt=""
                    className="w-full h-full object-scale-down mix-blend-multiply"
                  />
                </div>
              ))}
            </div>
            <div
              className={`w-full md:max-h-[350px] flex justify-center items-center p-4 cursor-pointer`}
            >
              <img
                src={displayImage}
                className={`${
                  darkMode ? "bg-white" : ""
                } max-h-[350px] w-full object-scale-down p-4 rounded-md`}
                alt="product image"
                onMouseMove={handleZoomImage}
                onMouseLeave={handleLeaveImageZoom}
              />
            </div>
          </div>
          {/* product details */}
          <div className="w-[50%] flex flex-col gap-2 relative">
            <h2
              className={`${
                darkMode ? "text-white" : ""
              } text-2xl font-semibold text-gray-700 text-ellipsis line-clamp-2`}
            >
              {product.productName}
            </h2>
            <p
              className={`${
                darkMode ? "text-white" : ""
              } text-gray-500 p-2 font-medium text-sm md:text-md`}
            >
              {product.brandName}
            </p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-semibold text-orange-600">
                <span className="text-3xl font-bold">৳</span>
                {convertNumberToBDT(product.sellingPrice)}
              </p>
              <span
                className={`${
                  darkMode ? "text-white" : ""
                } text-md text-slate-500 line-through`}
              >
                ৳{convertNumberToBDT(product.price)}
              </span>
            </div>
            <p
              className={`${
                darkMode ? "text-white" : ""
              } text-base text-gray-500`}
            >
              {product.description}
            </p>
            <div className="flex items-center gap-2">
              <button
                className={`${
                  darkMode ? "text-white" : "text-black"
                }bg-transparent border border-orange-600 text-base md:text-md px-4 py-2 rounded-lg shadow-lg mt-2 hover:bg-orange-600 hover:text-white`}
              >
                Buy Now
              </button>
              <button
                className="bg-orange-600 text-base text-white md:text-md px-4 py-2 rounded-lg shadow-lg mt-2 flex justify-center items-center gap-2 hover:border hover:border-orange-600 hover:bg-transparent hover:text-black"
                onClick={() => handleAddToCart(product._id)}
              >
                <FaCartPlus />
                Add to Cart
              </button>
            </div>
            {/* zoom image display contionally */}
            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[600px] overflow-hidden min-h-[420px] bg-white p-4 right-[20px] top-0">
                <div
                  className="w-full h-full min-h-[420px] min-w-[600px] mix-blend-multiply scale-125 p-4 object-scale-down"
                  style={{
                    background: `url(${displayImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                      zoomImageCoordinate.y * 100
                    }% `,
                  }}
                ></div>
              </div>
            )}
          </div>
        </div>
      )}
      {reviews.length > 0 && (
        <div className="container mx-auto py-8">
          <h2 className="text-md md:text-[22px] font-semibold block my-6">
            Reviews
          </h2>
          {reviews.length &&
            reviews?.map((review) => (
              <div
                key={review._id}
                className={`${
                  darkMode ? "bg-gray-700" : "bg-white"
                } flex gap-4 p-4 rounded-lg mb-4`}
              >
                <div className="md:w-1/12">
                  <div className="w-20 h-20 overflow-hidden">
                    {userState?.data?.data?._id &&
                      userState?.data?.data?.image !== null && (
                        <img
                          src={userState?.data?.data?.image}
                          alt="Avatar"
                          className="w-full h-full rounded-full"
                        />
                      )}
                    {userState?.data?.data?._id &&
                      userState?.data?.data?.image === null && (
                        <div className="w-full h-full rounded-full">
                          <FaUser size={60} />
                        </div>
                      )}
                  </div>
                </div>
                <div className="flex flex-col space-y-1 md:w-11/12">
                  <h2 className="text-base font-medium">{review.name}</h2>
                  <p className="text-sm font-normal text-gray-400">
                    {moment(review.createdAt).format("LLL")}
                  </p>
                  <p className="text-base text-gray-400 font-normal italic">
                    {review.description}
                  </p>
                  <div className="flex space-x-1">
                    {[...Array(review.rating)].map((_, index) => {
                      index += 1;
                      return (
                        <button
                          key={index}
                          type="button"
                          className={`text-2xl ${
                            index <= review.rating
                              ? "text-orange-600"
                              : "text-gray-500"
                          }`}
                        >
                          <span className="star">&#9733;</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
      <div className="container mx-auto">
        <RelatedProducts
          productId={product?._id}
          productCategory={product?.categoryName}
          heading={"Related products"}
        />
      </div>
    </>
  );
};
export default ProductDetails;
