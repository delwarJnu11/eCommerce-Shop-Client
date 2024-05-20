import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { actions } from "../actions";
import { api } from "../api";
import CartLoader from "../components/loader/CartLoader";
import CartProductCard from "../components/product/CartProductCard";
import { useCart } from "../hooks/useCart";
import { useTheme } from "../hooks/useTheme";
import { convertNumberToBDT } from "../utils/convertNumberToBDT";
import useFetchCartProducts from "../hooks/useFetchCartProducts";

const Cart = () => {
  const { state, dispatch } = useCart();
  const { darkMode } = useTheme();
  const { fetchCartProducts } = useFetchCartProducts();

  const handleDeleteCartProduct = async (id) => {
    try {
      const response = await api.delete(`/delete-cart-product/${id}`, {
        withCredentials: true,
      });

      if (response.data.success) {
        dispatch({ type: actions.cart.REMOVE_FROM_CART, id: id });
        toast.success(response.data.message);
        await fetchCartProducts();
      }
      if (response.data.error) {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  //calculate total product quantity added in the cart
  const totalQty = state?.cart?.reduce((prev, curr) => prev + curr.quantity, 0);
  //calculate total product price added in the cart
  const totalPrice = state?.cart?.reduce(
    (prev, curr) => prev + curr?.productId?.sellingPrice * curr.quantity,
    0
  );
  const stateLaoding = new Array(state?.cart?.length).fill(null);

  {
    state?.loading &&
      stateLaoding.map((el, index) => <CartLoader key={index} />);
  }

  return (
    <div className="container mx-auto py-6 flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-4/6 md:order-1">
        {state?.cart?.length > 0 ? (
          state?.cart?.map((product) => (
            <CartProductCard
              key={product?._id}
              product={product}
              fetchCartProducts={fetchCartProducts}
              onDelete={handleDeleteCartProduct}
            />
          ))
        ) : (
          <div>
            <p>No Products in the cart</p>
          </div>
        )}
      </div>
      <div className="w-full md:w-2/6 md:order-2 sm:order-1 sm:w-full overflow-hidden">
        <h2 className="bg-orange-600 text-white rounded p-2">Summary</h2>
        <div className="flex justify-between items-center px-4 mt-3">
          <p
            className={
              darkMode
                ? "dark font-semibold"
                : "text-gray-600 text-base font-semibold"
            }
          >
            Total Quantity :{" "}
          </p>
          <p
            className={
              darkMode ? "text-white font-bold" : "font-bold text-gray-600"
            }
          >
            {totalQty}
          </p>
        </div>
        <div className="flex justify-between items-center px-4 mt-3">
          <p
            className={`${
              darkMode ? "text-white" : "text-gray-600"
            } text-base font-semibold`}
          >
            Total Price :{" "}
          </p>
          <p
            className={`${
              darkMode ? "text-white" : "text-gray-600"
            } text-base font-semibold mt-3`}
          >
            <span className="font-extrabold">৳</span>{" "}
            {convertNumberToBDT(totalPrice)}
          </p>
        </div>
        <Link to={"/cart/checkout"}>
          <button className="w-full bg-green-600 text-white px-6 py-2 mt-3 transition-all rounded">
            Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Cart;
