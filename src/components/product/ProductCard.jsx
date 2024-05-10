import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { convertNumberToBDT } from "../../utils/convertNumberToBDT";
import EditProduct from "./EditProduct";

const ProductCard = ({ product }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const handleOnClose = () => {
    setShowEditModal(false);
  };
  return (
    <div className="rounded overflow-hidden relative group bg-white shadow-lg cursor-pointer">
      <div className="w-32 h-32 flex justify-center items-center mx-auto  p-3">
        <img
          src={product.productImages[0]}
          alt="Product Image"
          className="object-fill h-full"
        />
      </div>
      <div className="px-6 py-4">
        <h2 className="font-bold text-md mb-2 text-ellipsis line-clamp-2">
          {product.productName}
        </h2>

        <span className="inline-block bg-green-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 absolute top-2 left-2">
          {product.categoryName}
        </span>
        <p className="text-gray-700 text-base mb-2 font-semibold">
          Brand: {product.brandName}
        </p>

        <p className="text-gray-700 text-base font-bold mt-2">
          Price: <span className="font-extrabold">৳</span>{" "}
          {convertNumberToBDT(product.sellingPrice)}
        </p>
      </div>
      <div
        className="absolute top-2 right-2 p-2 text-white bg-green-600 rounded-full hidden group-hover:block cursor-pointer"
        onClick={() => setShowEditModal(true)}
      >
        <MdEdit size={18} />
      </div>
      {showEditModal && (
        <EditProduct product={product} onClose={handleOnClose} />
      )}
    </div>
  );
};
export default ProductCard;
