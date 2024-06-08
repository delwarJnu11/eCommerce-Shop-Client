import { FiMinus, FiPlus } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { actions } from "../../actions";
import useAxios from "../../hooks/useAxios";
import { useCart } from "../../hooks/useCart";
import useFetchCartProducts from "../../hooks/useFetchCartProducts";
import { convertNumberToBDT } from "../../utils/convertNumberToBDT";
import ToolTip from "../shared/ToolTip";

const CartProductCard = ({ item }) => {
  const location = useLocation();
  const { dispatch } = useCart();
  const { fetchCartProducts } = useFetchCartProducts();
  const { api } = useAxios();

  const handleDeleteCartProduct = async (id) => {
    try {
      const response = await api.delete(`/delete-cart-product/${id}`, {
        withCredentials: true,
      });

      if (response.data.success) {
        dispatch({ type: actions.cart.REMOVE_FROM_CART, id: id });
        toast.success(response.data.message);
        fetchCartProducts();
      }
      if (response.data.error) {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  //handle update product quantity
  const handleProductQty = async (id, qty) => {
    try {
      const response = await api.put(
        "/cart-product",
        { _id: id, quantity: qty },
        { withCredentials: true }
      );
      if (response.data.success) {
        dispatch({
          type: actions.cart.UPDATE_CART_QUANTITY,
          itemId: id,
          quantity: qty,
        });
        fetchCartProducts();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while updating product quantity.");
    }
  };

  return (
    <tr>
      <td className="py-4 px-2 border-b border-gray-300">
        <div className="flex items-center">
          <img
            src={item?.productId?.productImages[0]}
            alt={item?.productId?.productName}
            className="w-16 h-16 rounded"
          />
          <span className="ml-4 text-ellipsis line-clamp-2">
            {item?.productId?.productName}
          </span>
        </div>
      </td>
      <td className="py-4 px-2 border-b border-gray-300 text-sm">
        <span className="font-bold">৳</span>
        {convertNumberToBDT(item?.productId?.sellingPrice)}
      </td>
      <td className="py-4 px-2 border-b border-gray-300">
        <div className="flex items-center space-x-2">
          <button
            className="px-2 py-1 bg-gray-300 rounded"
            onClick={() =>
              handleProductQty(item?._id, Number(item.quantity - 1))
            }
          >
            <FiMinus />
          </button>
          <span>{item?.quantity}</span>
          <button
            className="px-2 py-1 bg-gray-300 rounded"
            onClick={() =>
              handleProductQty(item?._id, Number(item.quantity + 1))
            }
          >
            <FiPlus />
          </button>
        </div>
      </td>
      <td className="py-4 px-2 border-b border-gray-300 text-sm">
        <span className="font-extrabold">৳</span>{" "}
        {convertNumberToBDT(item?.productId?.sellingPrice * item?.quantity)}
      </td>
      {!location.pathname.includes("checkout") && (
        <td className="py-4 px-2 border-b border-gray-300">
          <ToolTip text="Delete">
            <button
              className="text-[#C40C0C] text-lg"
              onClick={() => handleDeleteCartProduct(item?._id)}
            >
              <RxCross1 size={20} />
            </button>
          </ToolTip>
        </td>
      )}
    </tr>
  );
};
export default CartProductCard;
