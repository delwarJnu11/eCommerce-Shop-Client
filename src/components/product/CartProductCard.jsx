import { FaMinus, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { api } from "../../api";
import { useTheme } from "../../hooks/useTheme";
import { convertNumberToBDT } from "../../utils/convertNumberToBDT";

const CartProductCard = ({ product, fetchCartProducts, onDelete }) => {
  const { darkMode } = useTheme();

  //handle update product quantity
  const handleProductQty = async (id, qty) => {
    try {
      const response = await api.put(
        "/cart-product",
        { _id: id, quantity: qty },
        { withCredentials: true }
      );
      if (response.data.success) {
        //here fetch updated cart product
        fetchCartProducts();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while updating product quantity.");
    }
  };

  return (
    <div
      className={`${
        darkMode ? "dark border border-gray-700" : "bg-white"
      } flex flex-col md:flex-row shadow-md rounded-lg p-4 mb-4`}
    >
      {/* Left side (image) */}
      <div className="md:w-1/3 h-40 mb-4 md:mb-0 md:mr-4 relative">
        <img
          src={product.productId.productImages[0]}
          alt={product.productId.productName}
          className={`${
            darkMode && "bg-white"
          } w-full h-full md:h-full object-scale-down rounded-lg`}
        />
        <p className="w-[30%] bg-green-600 rounded-full text-white text-center absolute top-1 left-1 capitalize">
          {product.productId.categoryName}
        </p>
      </div>
      {/* Right side (product details) */}
      <div className="md:w-2/3">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg md:text-lg text-ellipsis line-clamp-1 font-semibold">
            {product.productId.productName}
          </h2>

          <div
            className="cursor-pointer text-red-500 p-2 rounded-full hover:bg-red-600 hover:text-white hover:transition-all hover:scale-105"
            title="Delete"
            onClick={() => onDelete(product?._id)}
          >
            <MdDelete size={25} />
          </div>
        </div>
        <p className="bg-orange-600 w-1/6 md:w-[10%] rounded-full text-white text-center mb-2">
          {product.productId.brandName}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-orange-600 text-base font-bold mt-2">
            <span className="font-extrabold">৳</span>{" "}
            {convertNumberToBDT(product?.productId?.sellingPrice)}
          </p>
          <p
            className={`${
              darkMode ? "text-white" : "text-gray-600"
            } text-base font-semibold mt-2`}
          >
            <span className="font-extrabold">Total: ৳</span>{" "}
            {convertNumberToBDT(
              product.productId.sellingPrice * product.quantity
            )}
          </p>
        </div>
        <div className="ml-auto flex mt-2">
          <button
            className="text-white font-bold px-3 py-1 bg-orange-600 rounded-l"
            onClick={() => {
              if (product?.quantity >= 2) {
                handleProductQty(product._id, product.quantity - 1);
              }
            }}
          >
            <FaMinus size={15} color="white" />
          </button>
          <input
            type="number"
            className={
              darkMode
                ? "w-12 text-center dark border-t border-b border-gray-300 py-1 font-bold"
                : "w-12 text-center bg-gray-200 border-t border-b border-gray-300 py-1 font-bold"
            }
            disabled
            value={product.quantity}
          />
          <button
            className="text-white font-bold px-3 py-1 bg-green-600 rounded-r"
            onClick={() => handleProductQty(product._id, product.quantity + 1)}
          >
            <FaPlus size={15} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default CartProductCard;
