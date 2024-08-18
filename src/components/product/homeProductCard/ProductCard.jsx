import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { HiHeart } from "react-icons/hi2";
import { IoEyeOutline } from "react-icons/io5";
import { useInView } from "react-intersection-observer";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { actions } from "../../../actions";
import useAxios from "../../../hooks/useAxios";
import { useCart } from "../../../hooks/useCart";
import { calculateAverageRating } from "../../../utils/averageRating";
import { calculateProductDiscount } from "../../../utils/calculateProductDiscount";
import { convertNumberToBDT } from "../../../utils/convertNumberToBDT";
import ToolTip from "../../shared/ToolTip";

const ProductCard = ({ product }) => {
  const { api } = useAxios();
  const { state, dispatch } = useCart();
  const [isImageEnter, setIsImageEnter] = useState(false);
  const [isAddedWishList, setIsAddedWishList] = useState(false);
  const averageRating = parseFloat(calculateAverageRating(product?.reviews));
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  //handle wish list
  const handleWishlist = () => {
    const isInWishlist = state?.wishlist.some(
      (item) => item?._id === product._id
    );

    if (!isInWishlist) {
      setIsAddedWishList(true);
      dispatch({
        type: "ADD_TO_WISHLIST",
        data: product,
      });
      toast.success("Added to wishlist");
    } else {
      setIsAddedWishList(false);
      dispatch({
        type: "REMOVE_FROM_WISHLIST",
        id: product._id,
      });
      toast.success("Removed from wishlist");
    }
  };
  //handle add to cart
  const handleAddToCart = async (productId) => {
    try {
      const response = await api.post(
        "/product/add-to-cart",
        { productId },
        { withCredentials: true }
      );
      if (response.data.success) {
        dispatch({ type: actions.cart.ADD_TO_CART, data: productId });
        toast.success(response.data.message);
      }

      if (response.data.error) {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <motion.div
      className="border rounded-lg p-4 flex gap-4 shadow-lg cursor-pointer bg-white"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0 },
      }}
      transition={{ duration: 1 }}
    >
      <div className="w-2/5">
        <div
          className="w-full h-[200px] overflow-hidden relative"
          onMouseOver={() => setIsImageEnter(true)}
          onMouseLeave={() => setIsImageEnter(false)}
        >
          <img
            src={
              isImageEnter && product?.productImages[1]
                ? product?.productImages[1]
                : product?.productImages[0]
            }
            alt={product?.productName}
            className="w-full h-full object-scale-down mix-blend-multiply rounded-md transition-all duration-700"
          />
          <p className="absolute top-0 left-0 z-30 bg-[#FF6500] text-white text-sm font-medium p-1 rounded-md">
            {Math.ceil(
              calculateProductDiscount(product?.price, product?.sellingPrice)
            )}
            % OFF
          </p>
        </div>
      </div>
      <div className="w-3/5">
        <div className="flex flex-col">
          <div>
            <p className="text-sm text-gray-500 capitalize">
              {product.categoryName}
            </p>
            <h3 className="text-md font-semibold text-gray-800 text-ellipsis line-clamp-2">
              {product.productName}
            </h3>
          </div>
          {product?.reviews?.length && (
            <div className="my-2">
              <ReactStars
                count={5}
                value={averageRating}
                size={24}
                isHalf={true}
                edit={false}
                activeColor="#FF6500"
              />
            </div>
          )}
          <div className="mt-2">
            <span className="text-red-600 text-[15px] font-extrabold leading-5">
              ৳{convertNumberToBDT(product?.sellingPrice)}
            </span>
            <span className="line-through text-gray-400 ml-2">
              {convertNumberToBDT(product?.price)}
            </span>
          </div>
          <div className="flex mt-4 gap-4">
            <ToolTip text={"Add to wishlist"}>
              <p
                className="bg-slate-300 p-3 rounded-full cursor-pointer hover:bg-[#FF6500] hover:text-white transition-all ease-in-out"
                onClick={handleWishlist}
              >
                {isAddedWishList ? (
                  <HiHeart size={25} color="red" />
                ) : (
                  <CiHeart size={25} />
                )}
              </p>
            </ToolTip>
            <ToolTip text={"View details"}>
              <p className="bg-slate-300 p-3 rounded-full cursor-pointer hover:bg-[#FF6500] hover:text-white ease-in-out transition-all">
                <Link to={`/products/${product?.categoryName}/${product?._id}`}>
                  <IoEyeOutline size={25} />
                </Link>
              </p>
            </ToolTip>
            <ToolTip text={"Add to Cart"}>
              <p
                className="bg-slate-300 p-3 rounded-full cursor-pointer hover:bg-[#FF6500] hover:text-white ease-in-out transition-all"
                onClick={() => handleAddToCart(product?._id)}
              >
                <BsCart3 size={25} />
              </p>
            </ToolTip>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default ProductCard;
