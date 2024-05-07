import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { api } from "../../api";
import { productCategory } from "../../constants";
import Button from "../shared/Button";
import Field from "../shared/Field";
import ProductImageUpload from "./ProductImageUpload";

const ProductUploadModal = ({ onClose }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getProductImageUrls = (imageUrl) => {
    setImageUrls([...imageUrls, imageUrl]);
  };
  const handleUploadProduct = async (formData) => {
    formData.productImages = imageUrls;
    console.log(formData);
    try {
      const response = await api.post("/upload-product", formData, {
        withCredentials: true,
      });
      console.log(response);
      if (response.data.success) {
        toast.success(response?.data?.message);
        onClose();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 w-[40%] mx-auto max-h-[80%] overflow-y-scroll">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Upload Product</h2>
          <button
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-white focus:outline-none"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="mt-4">
          <form onSubmit={handleSubmit(handleUploadProduct)}>
            <Field label="Product Name" error={errors.productName}>
              <input
                {...register("productName", {
                  required: "Product Name is required.",
                })}
                className="auth-input"
                type="text"
                name="productName"
                id="productName"
                placeholder="Product Name"
              />
            </Field>
            <Field label="Brand Name" error={errors.brandName}>
              <input
                {...register("brandName", {
                  required: "Brand Name is required.",
                })}
                className="auth-input"
                type="text"
                name="brandName"
                id="brandName"
                placeholder="Brand Name"
              />
            </Field>
            <Field label="Category Name" error={errors.categoryName}>
              <select
                {...register("categoryName", {
                  required: "Category Name is required.",
                })}
                name="categoryName"
                id="categoryName"
                className="auth-input"
              >
                {productCategory.map((category) => (
                  <option value={category.value} key={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Price" error={errors.price}>
              <input
                {...register("price", {
                  required: "Price is required.",
                })}
                className="auth-input"
                type="number"
                name="price"
                id="price"
                placeholder="price"
              />
            </Field>
            <Field label="Selling Price" error={errors.sellingPrice}>
              <input
                {...register("sellingPrice", {
                  required: "Selling Price is required.",
                })}
                className="auth-input"
                type="number"
                name="sellingPrice"
                id="sellingPrice"
                placeholder="Selling Price"
              />
            </Field>
            <Field label="Product Image" error={errors.productImages}>
              <ProductImageUpload
                register={register}
                getProductImageUrls={getProductImageUrls}
                imageUrls={imageUrls}
              />
            </Field>
            <Field label="Description" error={errors.description}>
              <textarea
                {...register("description", {
                  required: "Description is required.",
                })}
                className="auth-input resize-none"
                type="text"
                name="description"
                id="description"
                placeholder="write about product..."
                rows={4}
              ></textarea>
            </Field>
            <Button
              value={"Upload Product"}
              bg={"bg-green-600"}
              hoverBg={"bg-green-800"}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductUploadModal;
