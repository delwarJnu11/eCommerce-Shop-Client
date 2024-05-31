import { useEffect } from "react";
import CheckOutForm from "../components/checkoutForm.jsx/CheckOutForm";
import CartProductCard from "../components/product/CartProductCard";
import Heading from "../components/shared/Heading";
import { useCart } from "../hooks/useCart";
import useFetchCartProducts from "../hooks/useFetchCartProducts";
import { convertNumberToBDT } from "../utils/convertNumberToBDT";

const Checkout = () => {
  const { state } = useCart();
  const { fetchCartProducts } = useFetchCartProducts();
  useEffect(() => {
    fetchCartProducts();
  }, [fetchCartProducts]);

  const user = state?.cart?.length && state?.cart[0].userId;
  // total cart product price based on quantity
  const totalPrice = state?.cart?.reduce(
    (prev, curr) => prev + curr?.productId?.sellingPrice * curr.quantity,
    0
  );
  return (
    <div className="container mx-auto py-6">
      <Heading value={"Checkout"} />
      <div className="flex justify-between gap-8">
        <div className="md:w-2/3 overflow-x-auto">
          <table className="min-w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left">
                  Product
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left">
                  Price
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left">
                  Quantity
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-300 text-left">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody>
              {state?.cart.length &&
                state?.cart?.map((product) => (
                  <CartProductCard key={product?._id} item={product} />
                ))}
              <tr className="text-center font-bold">
                <td colSpan="3" className="py-2 px-4">
                  Total
                </td>
                <td className="py-2 px-4 text-sm text-[#C40C0C] flex justify-between items-center">
                  <span className="font-extrabold">৳</span>{" "}
                  {convertNumberToBDT(totalPrice)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="md:w-1/3">
          <CheckOutForm cart={state?.cart} user={user} />
        </div>
      </div>
    </div>
  );
};
export default Checkout;
