import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { actions } from "../../actions";
import { productCategory } from "../../constants";
import useAxios from "../../hooks/useAxios";
import { useProduct } from "../../hooks/useProduct";
import { useTheme } from "../../hooks/useTheme";
import Button from "../shared/Button";
import Field from "../shared/Field";
import ProductImageUpload from "./ProductImageUpload";

const EditProduct = ({ product, onClose }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const { dispatch } = useProduct();
  const { darkMode } = useTheme();
  const { api } = useAxios();

  useEffect(() => {
    setImageUrls(product.productImages);
  }, [product.productImages]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      productName: product.productName,
      brandName: product.brandName,
      categoryName: product.categoryName,
      price: product.price,
      sellingPrice: product.sellingPrice,
      description: product.description,
    },
  });

  const getProductImageUrls = (imageUrl) => {
    setImageUrls([...imageUrls, imageUrl]);
  };
  const handleUploadProduct = async (formData) => {
    formData.productImages = imageUrls;
    dispatch({ type: actions.product.PRODUCT_DATA_FETCHING });
    try {
      const response = await api.put(
        `/product/${product._id}/update`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        dispatch({
          type: actions.product.ALL_PRODUCTS_DATA_FETCHED,
          data: response.data.products,
        });
        toast.success(response?.data?.message);
        onClose();
      }
    } catch (error) {
      dispatch({
        type: actions.product.PRODUCT_DATA_FETCHING_ERROR,
        error: error.message,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
      <div
        className={`${
          darkMode ? "bg-[#1a202c] text-white" : "bg-white"
        } rounded-lg p-8 w-[40%] mx-auto max-h-[80%] overflow-y-scroll shadow-lg`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Update Product</h2>
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
                className={`auth-input ${
                  darkMode ? "bg-gray-700 text-white" : ""
                }`}
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
                className={`auth-input ${
                  darkMode ? "bg-gray-700 text-white" : ""
                }`}
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
                className={`auth-input ${
                  darkMode ? "bg-gray-700 text-white" : ""
                }`}
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
                className={`auth-input ${
                  darkMode ? "bg-gray-700 text-white" : ""
                }`}
                type="number"
                name="price"
                id="price"
                placeholder="Price"
              />
            </Field>
            <Field label="Selling Price" error={errors.sellingPrice}>
              <input
                {...register("sellingPrice", {
                  required: "Selling Price is required.",
                })}
                className={`auth-input ${
                  darkMode ? "bg-gray-700 text-white" : ""
                }`}
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
                className={`auth-input resize-none ${
                  darkMode ? "bg-gray-700 text-white" : ""
                }`}
                type="text"
                name="description"
                id="description"
                placeholder="Write about product..."
                rows={4}
              ></textarea>
            </Field>
            <Button
              value={"Update Product"}
              bg={"bg-green-600"}
              hoverBg={"bg-green-800"}
            />
          </form>
        </div>
      </div>
    </div>
  );
};
export default EditProduct;
