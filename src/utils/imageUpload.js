import axios from "axios";

export const uploadImage = async (image) => {
  const formData = new FormData();

  formData.append("file", image);
  formData.append("upload_preset", "eCommerce_products");

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUD_NAME
      }/image/upload`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};
