import { FaShoppingCart } from "react-icons/fa";
import { useTheme } from "../../hooks/useTheme";
import { convertNumberToBDT } from "../../utils/convertNumberToBDT";

const CategorizedProductCard = ({ product, productDetails, onAddCart }) => {
  const { darkMode } = useTheme();
  return (
    <div
      className="mx-2 cursor-pointer"
      onClick={(e) => productDetails(e, product._id)}
    >
      <div
        className={`${
          darkMode
            ? "border border-slate-800 rounded-md"
            : "bg-white rounded-lg shadow-lg overflow-hidden"
        }`}
      >
        <div className={`${darkMode ? "bg-white overflow-hidden" : ""} p-2`}>
          <img
            className="w-full h-64 object-scale-down object-fit-scale hover:scale-110 transition-all"
            src={product.productImages[0]}
            alt={product.productName}
          />
        </div>
        <div className={`${darkMode ? "dark p-4" : "p-4"} `}>
          <h2
            className={`${
              darkMode ? "dark" : "text-gray-800"
            } font-bold text-lg mb-2 text-ellipsis line-clamp-1`}
          >
            {product.productName}
          </h2>
          <p
            className={
              darkMode ? "text-white text-sm" : "text-gray-600 text-sm"
            }
          >
            {product.brandName}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <p className="text-orange-600 text-base font-bold mt-2">
              <span className="font-extrabold">৳</span>{" "}
              {convertNumberToBDT(product.sellingPrice)}
            </p>
            <p
              className={
                darkMode
                  ? "text-white line-through"
                  : "text-gray-600 line-through"
              }
            >
              <span className="font-extrabold">৳</span>{" "}
              {convertNumberToBDT(product.price)}
            </p>
          </div>
          <button
            className="mt-4 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-800 focus:outline-none"
            onClick={() => onAddCart(product?._id)}
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
