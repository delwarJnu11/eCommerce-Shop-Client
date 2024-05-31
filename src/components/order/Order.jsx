import moment from "moment";
import { useTheme } from "../../hooks/useTheme";

const Order = ({ order, onReview, onTrackOrder }) => {
  const { darkMode } = useTheme();
  return (
    <div
      className={`${
        darkMode ? "bg-gray-800" : "bg-white"
      } p-4 rounded-md shadow-lg my-4`}
    >
      <div className="flex flex-col sm:flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <div className="flex items-center gap-4">
            <strong className="sm:text-sm text-base">
              Order ID - {order._id}
            </strong>
            <p className="text-sm uppercase font-semibold">
              <span
                className={`bg-[#FF8A08] text-white px-2 py-1 rounded-full`}
              >
                {order.orderStatus}
              </span>
            </p>
          </div>
          <p className="text-sm text-gray-500">
            Order placed on {moment(order?.createdAt).format("LLL")}
          </p>
        </div>
        <button
          className="bg-[#C40C0C] px-5 py-2 text-white text-sm uppercase font-semibold rounded-md"
          onClick={() => onTrackOrder(order)}
        >
          Track Order
        </button>
      </div>

      <div className="my-4">
        {order?.cartProductDetails?.map((product) => (
          <div
            key={product?.productId?._id}
            className={`${
              darkMode ? "bg-gray-700" : "bg-white"
            } p-4 flex flex-col md:flex-row justify-between gap-4 mb-4 rounded-md`}
          >
            <div className="flex flex-col md:flex-row gap-4 sm:text-center ">
              <div className="sm:w-full md:w-20 md:h-20 bg-white">
                <img
                  src={product?.productId?.productImages[0]}
                  alt={product?.productId?.productName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="">
                <h2 className="text-md font-medium text-ellipsis line-clamp-1">
                  {product?.productId?.productName.slice(0, 70)}
                </h2>
                <p className="text-left">Quantity: {product.quantity}</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <button
                className="bg-[#FF6500] px-4 py-2 leading-3 rounded-lg uppercase font-semibold text-sm text-white hover:scale-105 transition-all"
                onClick={() =>
                  onReview(
                    order.customerName,
                    order.email,
                    product?.productId?._id
                  )
                }
              >
                Write a review
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Order;
