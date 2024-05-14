import { toast } from "react-toastify";
import { api } from "../api";

export const handleAddToCart = async (productId) => {
  try {
    const response = await api.post(
      "/product/add-to-cart",
      { productId },
      { withCredentials: true }
    );
    if (response.data.success) {
      toast.success(response.data.message);
    }

    if (response.data.error) {
      toast.error(response.data.message);
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
