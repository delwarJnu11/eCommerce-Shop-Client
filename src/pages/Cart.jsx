import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartLoader from "../components/loader/CartLoader";
import CartProductCard from "../components/product/CartProductCard";
import { useCart } from "../hooks/useCart";
import useFetchCartProducts from "../hooks/useFetchCartProducts";
import { useUser } from "../hooks/useUser";
import { convertNumberToBDT } from "../utils/convertNumberToBDT";

const Cart = () => {
  const { state } = useCart();
  const { state: user } = useUser();
  console.log(user);
  const navigate = useNavigate();
  const { fetchCartProducts } = useFetchCartProducts();
  useEffect(() => {
    if (user?.data?.data?._id) {
      fetchCartProducts();
    } else {
      navigate("/login");
    }
  }, [user?.data?.data?._id, navigate]);

  if (state?.error) {
    console.error(state?.error);
  }

  //calculate total product quantity added in the cart
  const totalQty = state?.cart?.reduce((prev, curr) => prev + curr.quantity, 0);
  //calculate total product price added in the cart
  const totalPrice = state?.cart?.reduce(
    (prev, curr) => prev + curr?.productId?.sellingPrice * curr.quantity,
    0
  );
  const stateLaoding = new Array(state?.cart?.length).fill(null);

  return (
    <div className="container mx-auto py-6 flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-4/6 md:order-1">
        {state.loading === true
          ? stateLaoding.map((el, index) => <CartLoader key={index} />)
          : state?.cart &&
            state?.cart?.map((product) => (
              <CartProductCard
                key={product?._id}
                product={product}
                fetchCartProducts={fetchCartProducts}
              />
            ))}
      </div>
      <div className="w-full md:w-2/6 md:order-2 sm:order-1 sm:w-full overflow-hidden">
        <h2 className="bg-orange-600 text-white rounded p-2">Summary</h2>
        <div className="flex justify-between items-center px-4 mt-3">
          <p className="text-gray-600 text-base font-semibold">
            Total Quantity :{" "}
          </p>
          <p className="font-bold text-gray-600">{totalQty}</p>
        </div>
        <div className="flex justify-between items-center px-4 mt-3">
          <p className="text-gray-600 text-base font-semibold">
            Total Price :{" "}
          </p>
          <p className="text-gray-600 text-base font-semibold mt-2">
            <span className="font-extrabold">৳</span>{" "}
            {convertNumberToBDT(totalPrice)}
          </p>
        </div>
        <button className="w-full bg-green-600 text-white px-6 py-2 mt-3 transition-all rounded">
          Payment
        </button>
      </div>
    </div>
  );
};
export default Cart;
