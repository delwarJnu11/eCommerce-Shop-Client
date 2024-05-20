import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";
import OrderTracking from "../components/order/OrderTracking";
import CustomerReview from "../components/review/CustomerReview";
import { STATUS } from "../constants";
import { useTheme } from "../hooks/useTheme";

const TrackOrder = () => {
  const { email } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { darkMode } = useTheme();
  const [reviewData, setReviewData] = useState({
    customerName: "",
    customerEmail: "",
    productId: "",
  });
  const [showReviewModal, setShowReviewModal] = useState(false);

  //fetch orders by user email
  useEffect(() => {
    setLoading(true);
    const fetchOrdersbyUser = async () => {
      try {
        const response = await api.get(`/orders/user/${email}`, {
          withCredentials: true,
        });
        if (response.data.success) {
          setLoading(false);
          setOrders(response.data.orders);
        }
        if (response.data.error) {
          setLoading(false);
          setError(response.data.message);
        }
      } catch (error) {
        setLoading(false);
        setError(error.response.data.message);
      }
    };
    fetchOrdersbyUser();
  }, [email]);

  const handleReviewData = (name, email, productId) => {
    setReviewData({
      customerName: name,
      customerEmail: email,
      productId: productId,
    });
    setShowReviewModal(!showReviewModal);
  };

  if (loading) {
    return <p>orders fetching....</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  let currentOrderStatus = orders.map((order) => order.orderStatus);
  const currentIndex = STATUS.indexOf(currentOrderStatus[0]);

  return (
    <div className="container mx-auto py-6">
      <OrderTracking currentIndex={currentIndex} />
      <div className="py-8">
        {orders?.map((order) => {
          return (
            <div
              key={order._id}
              className={`${
                darkMode ? "bg-gray-800" : "bg-white"
              } p-4 rounded-md shadow-lg`}
            >
              <div className="flex flex-col sm:flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                <div>
                  <strong className="sm:text-sm text-base">
                    Order ID - {order._id}
                  </strong>
                  <p className="text-sm text-gray-500">
                    Order placed on {moment(order?.createdAt).format("LLL")}
                  </p>
                </div>
                <p className="text-sm uppercase font-semibold">
                  Order Status:{" "}
                  <span className="bg-orange-400 px-2 py-1 rounded-full">
                    {order.orderStatus}
                  </span>
                </p>
              </div>
              <div>
                {order?.cartProductDetails?.map((product) => (
                  <div
                    key={product?.productId?._id}
                    className={`${
                      darkMode ? "bg-gray-700" : "bg-white"
                    } p-4 flex flex-col md:flex-row justify-between gap-4 my-4 rounded-md`}
                  >
                    <div className="flex flex-col md:flex-row gap-4 sm:text-center ">
                      <div className="sm:w-full md:w-20 md:h-20 bg-white">
                        <img
                          src={product?.productId?.productImages[0]}
                          alt={product?.productId?.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h2 className="text-md font-medium text-ellipsis line-clamp-1">
                        {product?.productId?.productName.slice(0, 70)}
                      </h2>
                    </div>
                    <div className="flex flex-col md:flex-row items-center gap-4">
                      <p>Quantity: {product.quantity}</p>
                      <button
                        className="bg-orange-600 px-4 py-2 leading-3 rounded-lg uppercase font-semibold text-sm text-white hover:scale-105 transition-all"
                        onClick={() =>
                          handleReviewData(
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
        })}
      </div>
      {showReviewModal && (
        <CustomerReview
          data={reviewData}
          onClose={() => setShowReviewModal(false)}
        />
      )}
    </div>
  );
};
export default TrackOrder;
