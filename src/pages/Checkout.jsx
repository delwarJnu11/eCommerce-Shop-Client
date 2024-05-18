import { useEffect } from "react";
import CheckOutForm from "../components/checkoutForm.jsx/CheckOutForm";
import useFetchCartProducts from "../hooks/useFetchCartProducts";
import { convertNumberToBDT } from "../utils/convertNumberToBDT";

const Checkout = () => {
  //   const { state } = useCart();
  const { fetchCartProducts, cart } = useFetchCartProducts();
  useEffect(() => {
    fetchCartProducts();
  }, [fetchCartProducts]);
  const user = cart.length && cart[0].userId;
  // total cart product price based on quantity
  const totalPrice = cart?.reduce(
    (prev, curr) => prev + curr?.productId?.sellingPrice * curr.quantity,
    0
  );
  return (
    <div className="container mx-auto py-6">
      Total cart items: {cart?.length}
      <div className="flex justify-between gap-4">
        <div className="md:w-2/3 overflow-x-auto">
          <table className="min-w-full bg-transparent border-collapse">
            <thead>
              <tr className="bg-orange-500 text-white border-b border-gray-700">
                <th className="py-2 px-4">SL.</th>
                <th className="py-2 px-4">Product Name</th>
                <th className="py-2 px-4">Quantity</th>
                <th className="py-2 px-4">Unit Price</th>
                <th className="py-2 px-4">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.length &&
                cart?.map((product, index) => (
                  <tr
                    key={product._id}
                    className="text-center py-3 border-b border-gray-700"
                  >
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4 line-clamp-1 text-ellipsis">
                      {product?.productId?.productName.slice(0, 50)}
                    </td>
                    <td className="py-2 px-4">{product.quantity}</td>
                    <td className="py-2 px-4">
                      {product?.productId?.sellingPrice}
                    </td>
                    <td className="py-2 px-4">
                      {product?.productId?.sellingPrice * product?.quantity}
                    </td>
                  </tr>
                ))}
              <tr className="text-center font-bold">
                <td colSpan="4" className="py-2 px-4">
                  Total
                </td>
                <td className="py-2 px-4">
                  <span className="font-extrabold">৳</span>{" "}
                  {convertNumberToBDT(totalPrice)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="md:w-1/3">
          <CheckOutForm cart={cart} user={user} />
        </div>
      </div>
    </div>
  );
};
export default Checkout;
