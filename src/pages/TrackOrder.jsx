import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Order from "../components/order/Order";
import OrderTracking from "../components/order/OrderTracking";
import CustomerReview from "../components/review/CustomerReview";
import NotFound from "../components/shared/NotFound";
import useAxios from "../hooks/useAxios";

const TrackOrder = () => {
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
  const { api } = useAxios();

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
  }, [email, api]);

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

  const pendingOrders = orders.filter(
    (order) => order.orderStatus !== "Delivered"
  );

  return (
    <div className="container mx-auto py-6">
      <Link to={`/orders/history/${email}`} className="flex justify-start">
        <button className="bg-[#FF6500] px-4 py-2 rounded-md text-white text-sm font-semibold uppercase">
          ORder History
        </button>
      </Link>
      <div className="py-8">
        {pendingOrders?.length > 0 ? (
          pendingOrders?.map((order) => {
            return (
              <Order
                key={order?._id}
                order={order}
                onReview={handleReviewData}
                onTrackOrder={handleTrackOrder}
              />
            );
          })
        ) : (
          <NotFound
            image="https://i.ibb.co/Z8rdq8G/cart.jpg"
            title="you have no pending orders at the moment"
          />
        )}
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
export default TrackOrder;
