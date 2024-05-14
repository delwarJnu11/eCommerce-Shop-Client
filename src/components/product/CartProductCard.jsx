import { FaMinus, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { api } from "../../api";

const CartProductCard = ({ product, fetchCartProducts }) => {
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
    <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg p-4 mb-4">
      {/* Left side (image) */}
      <div className="md:w-1/3 h-40 mb-4 md:mb-0 md:mr-4 relative">
        <img
          src={product.productId.productImages[0]}
          alt={product.productId.productName}
          className="w-full h-full md:h-full object-scale-down rounded-lg"
        />
        <p className="w-[30%] bg-green-600 rounded-full text-white text-center absolute top-0 left-0 capitalize">
          {product.productId.categoryName}
        </p>
      </div>
      {/* Right side (product details) */}
      <div className="md:w-2/3">
        <h2 className="text-lg md:text-lg text-ellipsis line-clamp-1 font-semibold mb-3">
          {product.productId.productName}
        </h2>
        <p className="bg-orange-600 w-1/6 md:w-[10%] rounded-full text-white text-center mb-2">
          {product.productId.brandName}
        </p>
        <span className="text-gray-600">
          Price: ${product.productId.sellingPrice}
        </span>
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
            className="w-12 text-center bg-gray-200 border-t border-b border-gray-300 py-1 font-bold"
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
