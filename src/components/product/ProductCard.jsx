import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { useTheme } from "../../hooks/useTheme";
import { calculateProductDiscount } from "../../utils/calculateProductDiscount";
import { convertNumberToBDT } from "../../utils/convertNumberToBDT";
import EditProduct from "./EditProduct";

const ProductCard = ({ product }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const { darkMode } = useTheme();

  //handle Modal Close
  const handleOnClose = () => {
    setShowEditModal(false);
  };
  return (
    <div
      className={`${
        darkMode ? "dark border border-slate-800" : "bg-white"
      } rounded overflow-hidden relative group shadow-lg cursor-pointer`}
    >
      <div
        className={`${
          darkMode && "bg-white"
        } w-full h-32 flex justify-center items-center mx-auto p-3 relative`}
      >
        <img
          src={product.productImages[0]}
          alt="Product Image"
          className="object-fill h-full"
        />
        <p className="absolute top-12 left-2 z-30 bg-[#FF6500] text-white text-sm font-medium p-1 rounded-md">
          {Math.ceil(
            calculateProductDiscount(product?.price, product?.sellingPrice)
          )}
          % OFF
        </p>
      </div>
      <div className="px-6 py-4">
        <h2 className="text-base font-semibold tracking-wider text-[#414141] hover:text-[#FF6500] transition-all text-ellipsis line-clamp-1 mb-2">
          {product.productName}
        </h2>

        <span className="inline-block bg-[#C40C0C] rounded-md capitalize px-3 py-1 text-sm font-medium text-white mr-2 absolute top-2 left-2">
          {product.categoryName}
        </span>
        <p
          className={`${
            darkMode ? "text-white" : "text-[#848484]"
          } capitalize text-sm font-medium tracking-wide  hover:text-[#FF6500] transition-all mb-2`}
        >
          Brand: {product.brandName}
        </p>

        <p className={`text-[#C40C0C] text-[15px] font-extrabold leading-5`}>
          {" "}
          <span className="font-extrabold">৳</span>{" "}
          {convertNumberToBDT(product.sellingPrice)}
        </p>
      </div>
      <div
        className="absolute top-2 right-2 p-2 text-white bg-[#FF6500] rounded-full hidden group-hover:block cursor-pointer"
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
