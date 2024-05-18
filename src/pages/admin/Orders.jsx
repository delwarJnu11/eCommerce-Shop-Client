import moment from "moment";
import { useEffect, useState } from "react";
import { api } from "../../api";
import ProductCardModal from "../../components/admin/PRoductCardModal";
import { useTheme } from "../../hooks/useTheme";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { darkMode } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({
    customerName: "",
    products: [],
  });

  useEffect(() => {
    setLoading(true);
    const fetchOrders = async () => {
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
    };
    fetchOrders();
  }, []);
  // handle order products
  const handleOrderedProducts = (name, items) => {
    setData({
      customerName: name,
      products: items,
    });
    setShowModal(!showModal);
  };

  console.log(orders);

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
              Address
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
              Price
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
                <td className="px-6 py-4 whitespace-nowrap">{order.address}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {order.totalPrice}/=
                </td>
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
                  <button
                    className="bg-orange-600 px-4 py-1 uppercase font-semibold text-sm rounded"
                    onClick={() =>
                      handleOrderedProducts(
                        order.customerName,
                        order.cartProductDetails
                      )
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
