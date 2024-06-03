import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { HiHeart } from "react-icons/hi2";
import { IoEyeOutline } from "react-icons/io5";
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

const ProductCardVertical = ({ product }) => {
  const { state, dispatch } = useCart();
  const [isAddedWishList, setIsAddedWishList] = useState(false);
  const [isImageEnter, setIsImageEnter] = useState(false);
  const { api } = useAxios();
  const averageRating = parseFloat(calculateAverageRating(product?.reviews));

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(state?.wishlist));
  }, [state.wishlist]);

  //handle wish list
  const handleWishlist = () => {
    console.log(product);
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
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ease: "easeOut", duration: 1.5 }}
      className="relative group cursor-pointer bg-white border border-gray-200 rounded-md"
    >
      <div className="p-4 transition-all">
        <div
          className="w-full h-60 lg:h-72 overflow-hidden relative"
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
            className={`w-full h-full p-4 object-scale-down mix-blend-multiply transition-all  duration-700 border-0 group-hover:border group-hover:border-[#FF6500] group-hover:rounded-md`}
          />
          <p className="absolute top-2 left-2 z-30 bg-[#FF6500] text-white text-sm font-medium p-1 rounded-md">
            {Math.ceil(
              calculateProductDiscount(product?.price, product?.sellingPrice)
            )}
            % OFF
          </p>
        </div>
        <div className="flex-col p-4 space-y-4 absolute top-14 right-3 hidden group-hover:flex">
          <ToolTip text={"Add to wishlist"}>
            <button
              className=" bg-slate-300 p-3 rounded-full cursor-pointer hover:text-[#FF6500] transition-all"
              onClick={handleWishlist}
            >
              {isAddedWishList ? (
                <HiHeart size={25} color="red" />
              ) : (
                <CiHeart size={25} />
              )}
            </button>
          </ToolTip>
          <ToolTip text="View Details">
            <p className=" bg-slate-300 p-3 rounded-full cursor-pointer hover:text-[#FF6500] transition-all">
              <Link to={`/products/${product?.categoryName}/${product?._id}`}>
                <IoEyeOutline size={25} />
              </Link>
            </p>
          </ToolTip>

          <ToolTip text="Add to Cart">
            <button
              className="bg-slate-300 p-3 rounded-full cursor-pointer hover:text-[#FF6500] transition-all"
              onClick={() => handleAddToCart(product?._id)}
            >
              <BsCart3 size={25} />
            </button>
          </ToolTip>
        </div>
      </div>
      <div className="flex flex-col space-y-3 p-4">
        <p className="capitalize text-sm font-medium tracking-wide text-[#848484] hover:text-[#FF6500] transition-all">
          {product?.categoryName}
        </p>
        <Link to={`/products/${product?.categoryName}/${product?._id}`}>
          <h2 className="text-base font-semibold tracking-wider text-[#414141] hover:text-[#FF6500] transition-all text-ellipsis line-clamp-1">
            {product?.productName}
          </h2>
        </Link>
        {product?.reviews?.length > 0 && (
          <div className="my-1 flex items-center gap-2">
            <ReactStars
              count={5}
              value={averageRating}
              size={24}
              isHalf={true}
              edit={false}
              activeColor="#FF6500"
            />
            <p>({product?.reviews?.length})</p>
          </div>
        )}
        <div className="mt-2">
          <span className="text-[#C40C0C] text-[15px] font-extrabold leading-5">
            ৳{convertNumberToBDT(product?.sellingPrice)}
          </span>
          <span className="line-through text-gray-400 ml-2">
            {convertNumberToBDT(product?.price)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
export default ProductCardVertical;
