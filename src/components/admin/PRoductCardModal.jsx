import { useTheme } from "../../hooks/useTheme";
import { convertNumberToBDT } from "../../utils/convertNumberToBDT";

const ProductCardModal = ({ onClose, data }) => {
  const { darkMode } = useTheme();
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
      <div
        className={`${
          darkMode ? "dark" : "bg-white"
        }  rounded-lg p-6 mt-28 w-full max-w-4xl z-50`}
      >
        <h2 className="text-xl font-semibold mb-4">
          Order Products for {data.order.customerName}
        </h2>
        <div className="overflow-x-auto">
          <table className={`${darkMode ? "dark" : "bg-white"} min-w-full`}>
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-start">Product Name</th>
                <th className="px-4 py-2 border-b text-start">Product ID</th>
                <th className="px-4 py-2 border-b text-start">Ship Address</th>
                <th className="px-4 py-2 border-b text-start">Quantity</th>
                <th className="px-4 py-2 border-b text-start">Unit Price</th>
                <th className="px-4 py-2 border-b text-start">total price</th>
              </tr>
            </thead>
            <tbody>
              {data?.products?.map((product) => (
                <tr key={product.productId._id}>
                  <td className="px-4 py-2 border-b text-start">
                    {product.productId.productName.slice(0, 20)}
                  </td>
                  <td className="px-4 py-2 border-b text-start">
                    {product.productId._id}
                  </td>
                  <td className="px-4 py-2 border-b text-start">
                    {data.order.address}
                  </td>
                  <td className="px-4 py-2 border-b text-start">
                    {product.quantity}
                  </td>
                  <td className="px-4 py-2 border-b text-start">
                    {product.productId.sellingPrice}
                  </td>
                  <td className="px-4 py-2 border-b text-start">
                    {product.productId.sellingPrice * product.quantity}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="5" className="px-4 py-2 text-start font-bold">
                  Total Bill =
                </td>
                <td colSpan="1" className="px-4 py-2 text-start font-bold">
                  {convertNumberToBDT(data.order.totalPrice)}/=
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProductCardModal;
