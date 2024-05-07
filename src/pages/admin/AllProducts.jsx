import { useState } from "react";
import ProductUploadModal from "../../components/product/ProductUploadModal";
import Button from "../../components/shared/Button";

const AllProducts = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between px-4 py-2">
        <h2 className="text-lg font-bold">All Products</h2>
        <Button
          value="Upload Product"
          buttonAction={() => setOpenModal(true)}
          bg="bg-green-600"
          hoverBg="bg-green-800"
        />
      </div>
      {openModal && <ProductUploadModal onClose={() => setOpenModal(false)} />}
    </div>
  );
};
export default AllProducts;
