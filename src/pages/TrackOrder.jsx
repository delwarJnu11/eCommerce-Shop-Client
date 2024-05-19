import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";
import { STATUS } from "../constants";

const TrackOrder = () => {
  const { email } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <p>orders fetching....</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  let currentOrderStatus = orders.map((order) => order.orderStatus);
  console.log("status", currentOrderStatus);
  const currentIndex = STATUS.indexOf(currentOrderStatus[0]);
  console.log("index", currentIndex);

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mt-4">
        {STATUS.map((step, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                index <= currentIndex
                  ? "border-green-500 bg-green-500"
                  : "border-gray-300"
              }`}
            >
              {index <= currentIndex && (
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              )}
            </div>
            <div
              className={`mt-2 text-xs ${
                index <= currentIndex
                  ? "text-green-500 font-semibold"
                  : "text-gray-500"
              }`}
            >
              {step}
            </div>
            {index < STATUS.length - 1 && (
              <div
                className={`flex-1 h-1 ${
                  index < currentIndex ? "bg-green-500" : "bg-gray-300"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default TrackOrder;
