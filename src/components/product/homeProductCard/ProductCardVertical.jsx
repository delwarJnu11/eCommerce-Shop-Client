import { BsCart3 } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { actions } from "../../../actions";
import { api } from "../../../api";
import { useCart } from "../../../hooks/useCart";
import { convertNumberToBDT } from "../../../utils/convertNumberToBDT";

const ProductCardVertical = ({ product }) => {
  const { dispatch: cartDispatch } = useCart();
  //handle add to cart
  const handleAddToCart = async (e, productId) => {
    e.stopPropagation();
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
    <div className="relative group cursor-pointer" key={product?._id}>
      <div className="p-4 transition-all">
        <div className="w-full h-60 lg:h-72 overflow-hidden">
          <img
            src={product?.productImages[0]}
            alt={product?.productName}
            className="w-full h-full p-4 object-scale-down mix-blend-multiply transition-all border-0 group-hover:border group-hover:border-[#FF6500] group-hover:rounded-md"
          />
        </div>
        <div className="flex-col p-4 space-y-4 overflow-hidden absolute top-14 right-3 hidden group-hover:flex">
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
            onClick={(e) => handleAddToCart(e, product?._id)}
          >
            <BsCart3 size={25} />
          </p>
        </div>
      </div>
      <div className="flex flex-col space-y-3 p-4">
        <p className="capitalize text-sm font-medium tracking-wide text-[#848484] hover:text-[#FF6500] transition-all">
          {product?.categoryName}
        </p>
        <h2 className="text-base font-semibold tracking-wider text-[#414141] hover:text-[#FF6500] transition-all text-ellipsis line-clamp-2">
          {product?.productName}
        </h2>
        <p>ratings: 5</p>
        <div className="mt-2">
          <span className="text-red-600 text-[15px] font-extrabold leading-5">
            ৳{convertNumberToBDT(product?.sellingPrice)}
          </span>
          <span className="line-through text-gray-400 ml-2">
            {convertNumberToBDT(product?.price)}
          </span>
        </div>
      </div>
    </div>
  );
};
export default ProductCardVertical;
