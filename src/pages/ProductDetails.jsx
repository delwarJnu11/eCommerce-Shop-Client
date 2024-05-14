import { useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { actions } from "../actions";
import { api } from "../api";
import ProductDetailsLoader from "../components/loader/ProductDetailsLoader";
import RelatedProducts from "../components/product/RelatedProducts";
import { useProduct } from "../hooks/useProduct";
import { convertNumberToBDT } from "../utils/convertNumberToBDT";

const ProductDetails = () => {
  const { id } = useParams();
  const { state, dispatch } = useProduct();
  const [displayImage, setDisplayImage] = useState("");
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);

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
  }, [dispatch, id]);

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
        <div className="container mx-auto flex gap-3 overflow-hidden py-6">
          {/* image section */}
          <div className="w-[50%] flex sm:flex-col md:flex-row gap-2 overflow-hidden">
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
            <div className="w-full md:max-h-[350px] flex justify-center items-center p-4 cursor-pointer">
              <img
                src={displayImage}
                className="max-h-[350px] w-full object-scale-down mix-blend-multiply p-4"
                alt="product image"
                onMouseMove={handleZoomImage}
                onMouseLeave={handleLeaveImageZoom}
              />
            </div>
          </div>
          {/* product details */}
          <div className="w-[50%] flex flex-col gap-2 relative">
            <h2 className="text-2xl font-semibold text-gray-700 text-ellipsis line-clamp-2">
              {product.productName}
            </h2>
            <p className="text-gray-500 p-2 font-medium text-sm md:text-md">
              {product.brandName}
            </p>
            <div className="flex items-center gap-2">
              <pn className="text-2xl font-semibold text-orange-600">
                <span className="text-3xl font-bold">৳</span>
                {convertNumberToBDT(product.sellingPrice)}
              </pn>
              <span className="text-md text-slate-500 line-through">
                ৳{convertNumberToBDT(product.price)}
              </span>
            </div>
            <p className="text-base text-gray-500">{product.description}</p>
            <div className="flex items-center gap-2">
              <button className="bg-transparent border border-orange-600 text-base text-black md:text-md px-4 py-2 rounded-lg shadow-lg mt-2 hover:bg-orange-600 hover:text-white">
                Buy Now
              </button>
              <button className="bg-orange-600 text-base text-white md:text-md px-4 py-2 rounded-lg shadow-lg mt-2 flex justify-center items-center gap-2 hover:border hover:border-orange-600 hover:bg-transparent hover:text-black">
                <FaCartPlus />
                Add to Cart
              </button>
            </div>
            {/* zoom image display contionally */}
            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[600px] overflow-hidden min-h-[420px] bg-white p-4 right-[20px] top-0">
                <div
                  className="w-full h-full min-h-[420px] min-w-[600px] mix-blend-multiply scale-125 p-4"
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