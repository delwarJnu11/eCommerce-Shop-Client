import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProductCardModal from "../../components/admin/PRoductCardModal";
import { STATUS } from "../../constants";
import useAxios from "../../hooks/useAxios";
import { useTheme } from "../../hooks/useTheme";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { darkMode } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const { api } = useAxios();
  const [data, setData] = useState({
    customerName: "",
    products: [],
  });

  const fetchOrders = useCallback(async () => {
    try {
      const response = await api.get("/orders", { withCredentials: true });
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
  }, [api]);

  useEffect(() => {
    setLoading(true);
    fetchOrders();
  }, [fetchOrders]);

  // handle order products
  const handleOrderedProducts = (order, items) => {
    setData({
      order: order,
      products: items,
    });
    setShowModal(!showModal);
  };
  // handle status change
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await api.put(
        `/order/${orderId}/status`,
        {
          newStatus,
        },
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchOrders(); // Refresh the orders list if necessary
      }
      if (response.data.error) {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }
  if (loading) {
    return <p>Order Loading...</p>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className={darkMode ? "dark" : "bg-gray-50 text-gray-900"}>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
              Cus. Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
              Phone
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
              Payment
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
              TrxId
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
              Order Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
              ORder status
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
              Products
            </th>
          </tr>
        </thead>
        <tbody
          className={`${
            darkMode ? "dark" : "bg-white"
          } divide-y divide-gray-300`}
        >
          {orders.length &&
            orders.map((order) => (
              <tr key={order._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.customerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{order.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.paymentStatus}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.transactionId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {moment(order.createdAt).format("ll")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                      darkMode ? "dark" : "bg-white"
                    }`}
                    value={order.orderStatus}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                  >
                    {STATUS.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="bg-orange-600 px-4 py-1 uppercase font-semibold text-sm rounded"
                    onClick={() =>
                      handleOrderedProducts(order, order.cartProductDetails)
                    }
                  >
                    view Products
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
        {showModal && (
          <ProductCardModal data={data} onClose={() => setShowModal(false)} />
        )}
      </table>
    </div>
  );
};
export default Orders;
