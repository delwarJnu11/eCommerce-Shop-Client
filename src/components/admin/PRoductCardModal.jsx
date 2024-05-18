import { useTheme } from "../../hooks/useTheme";

const ProductCardModal = ({ onClose, data }) => {
  const { darkMode } = useTheme();
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
      <div
        className={`${
          darkMode ? "dark" : "bg-white"
        }  rounded-lg p-6 w-full max-w-4xl`}
      >
        <h2 className="text-xl font-semibold mb-4">
          Order Products for {data.customerName}
        </h2>
        <div className="overflow-x-auto">
          <table className={`${darkMode ? "dark" : "bg-white"} min-w-full`}>
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-start">Product Name</th>
                <th className="px-4 py-2 border-b text-start">Brand</th>
                <th className="px-4 py-2 border-b text-start">Category</th>
                <th className="px-4 py-2 border-b text-start">Product ID</th>
                <th className="px-4 py-2 border-b text-start">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {data?.products?.map((product) => (
                <tr key={product.productId._id}>
                  <td className="px-4 py-2 border-b text-start">
                    {product.productId.productName}
                  </td>
                  <td className="px-4 py-2 border-b text-start">
                    {product.productId.brandName}
                  </td>
                  <td className="px-4 py-2 border-b text-start">
                    {product.productId.categoryName}
                  </td>
                  <td className="px-4 py-2 border-b text-start">
                    {product.productId._id}
                  </td>
                  <td className="px-4 py-2 border-b text-start">
                    {product.quantity}
                  </td>
                </tr>
              ))}
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
