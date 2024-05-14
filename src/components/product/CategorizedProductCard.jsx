import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../api";
import useFetchCartProducts from "../../hooks/useFetchCartProducts";
import { convertNumberToBDT } from "../../utils/convertNumberToBDT";

const CategorizedProductCard = ({ product, productDetails }) => {
  const navigate = useNavigate();
  const { fetchCartProducts } = useFetchCartProducts();

  // handle Add to Cart
  const handleAddToCart = async (productId) => {
    try {
      const response = await api.post(
        "/product/add-to-cart",
        { productId },
        { withCredentials: true }
      );
      if (response.data.success) {
        fetchCartProducts();
        toast.success(response.data.message);
      }

      if (response.data.error) {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      navigate("/login");
    }
  };

  return (
    <div
      className="mx-2 cursor-pointer"
      onClick={(e) => productDetails(e, product._id)}
    >
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border-red-700">
        <div className="p-2">
          <img
            className="w-full h-64 object-scale-down object-fit-scale hover:scale-110 transition-all"
            src={product.productImages[0]}
            alt={product.productName}
          />
        </div>
        <div className="p-4">
          <h2 className="text-gray-800 font-bold text-lg mb-2 text-ellipsis line-clamp-1">
            {product.productName}
          </h2>
          <p className="text-gray-600 text-sm">{product.brandName}</p>
          <div className="flex items-center gap-2 mt-2">
            <p className="text-orange-700 text-base font-bold mt-2">
              <span className="font-extrabold">৳</span>{" "}
              {convertNumberToBDT(product.sellingPrice)}
            </p>
            <p className="text-gray-600 line-through">
              <span className="font-extrabold">৳</span>{" "}
              {convertNumberToBDT(product.price)}
            </p>
          </div>
          <button
            className="mt-4 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-800 focus:outline-none"
            onClick={() => handleAddToCart(product?._id)}
          >
            <FaShoppingCart className="inline-block mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
export default CategorizedProductCard;
