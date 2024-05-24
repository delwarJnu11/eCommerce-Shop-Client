import { BsCart3 } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { actions } from "../../../actions";
import { api } from "../../../api";
import { useCart } from "../../../hooks/useCart";
import { convertNumberToBDT } from "../../../utils/convertNumberToBDT";

const ProductCard = ({ product }) => {
  const { dispatch: cartDispatch } = useCart();
  //handle add to cart
  const handleAddToCart = async (productId) => {
    try {
      const response = await api.post(
        "/product/add-to-cart",
        { productId },
        { withCredentials: true }
      );
      if (response.data.success) {
        cartDispatch({ type: actions.cart.ADD_TO_CART, data: productId });
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
    <div className="border rounded-lg p-4 flex space-x-4 shadow-lg cursor-pointer">
      <div className="w-[200px] h-[200px] overflow-hidden">
        <img
          src={product?.productImages[0]}
          alt={product?.productName}
          className="w-full h-full object-scale-down mix-blend-multiply rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <div>
          <p className="text-sm text-gray-500">{product.categoryName}</p>
          <h3 className="text-md font-semibold text-gray-800 text-ellipsis line-clamp-2">
            {product.productName}
          </h3>
        </div>
        <div className="mt-2">
          <span className="text-red-600 text-[15px] font-extrabold leading-5">
            ৳{convertNumberToBDT(product?.sellingPrice)}
          </span>
          <span className="line-through text-gray-400 ml-2">
            {convertNumberToBDT(product?.price)}
          </span>
        </div>
        <div className="flex mt-4 gap-4">
          <p
            className="border border-gray-200 bg-slate-300 p-2 rounded-full cursor-pointer hover:text-[#FF6500] transition-all"
            title="Add to Wishlist"
          >
            <CiHeart size={25} />
          </p>
          <Link
            to={`/products/${product?.categoryName}/${product?._id}`}
            className="border border-gray-200 bg-slate-300 p-2 rounded-full cursor-pointer hover:text-[#FF6500] transition-all"
            title="View Details"
          >
            <IoEyeOutline size={25} />
          </Link>
          <p
            className="border border-gray-200 bg-slate-300 p-2 rounded-full cursor-pointer hover:text-[#FF6500] transition-all"
            title="Add to Cart"
            onClick={() => handleAddToCart(product?._id)}
          >
            <BsCart3 size={25} />
          </p>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
