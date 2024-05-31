import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { api } from "../api";
import Order from "../components/order/Order";
import OrderTracking from "../components/order/OrderTracking";
import CustomerReview from "../components/review/CustomerReview";
import { STATUS } from "../constants";

const OrderHistory = () => {
  const { email } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reviewData, setReviewData] = useState({
    customerName: "",
    customerEmail: "",
    productId: "",
  });
  const [orderHistory, setOrderHistory] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [trackOrderModal, setTrackOrderModal] = useState(false);

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
  const handleTrackOrder = (order) => {
    setOrderHistory(order);
    setTrackOrderModal(true);
  };

  if (loading) {
    return <p>orders fetching....</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  const statuses = orders?.map((order) => order.orderStatus);
  const lastCompletedIndex = STATUS.findIndex((step) => step === statuses[0]);

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-start">
        <button
          className="bg-[#FF6500] px-4 py-2 rounded-md text-white text-sm font-semibold uppercase flex items-center gap-2"
          onClick={() => window.history.back()}
        >
          <BiArrowBack size={20} />
          Go Back
        </button>
      </div>
      <div className="py-8">
        {orders?.length &&
          orders
            ?.filter(
              (order) => order?.orderStatus === STATUS[lastCompletedIndex]
            )
            ?.map((order) => {
              return (
                <Order
                  key={order?._id}
                  order={order}
                  onReview={handleReviewData}
                  onTrackOrder={handleTrackOrder}
                />
              );
            })}
      </div>

      {showReviewModal && (
        <CustomerReview
          data={reviewData}
          onClose={() => setShowReviewModal(false)}
        />
      )}
      {trackOrderModal && (
        <OrderTracking
          onClose={() => setTrackOrderModal(false)}
          order={orderHistory}
        />
      )}
    </div>
  );
};
export default OrderHistory;
