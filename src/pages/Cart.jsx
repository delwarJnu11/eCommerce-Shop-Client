import { useEffect } from "react";
import CartProductCard from "../components/product/CartProductCard";
import { useCart } from "../hooks/useCart";
import useFetchCartProducts from "../hooks/useFetchCartProducts";

const Cart = () => {
  const { state } = useCart();
  const { fetchCartProducts } = useFetchCartProducts();

  useEffect(() => {
    fetchCartProducts();
  }, []);

  return (
    <div className="container mx-auto py-6 flex flex-col md:flex-row">
      <div className="w-full md:w-4/6 md:order-1">
        {state?.cart &&
          state?.cart?.map((product) => (
            <CartProductCard
              key={product?._id}
              product={product}
              fetchCartProducts={fetchCartProducts}
            />
          ))}
      </div>
      <div className="w-full md:w-2/6 md:order-2 sm:order-1 sm:w-full p-4">
        Second Column Content
      </div>
    </div>
  );
};
export default Cart;
