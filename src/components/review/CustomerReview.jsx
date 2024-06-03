import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";
import { useTheme } from "../../hooks/useTheme";
import Button from "../shared/Button";
import Field from "../shared/Field";
import StarRating from "./StarRating";

const CustomerReview = ({ data, onClose }) => {
  const { api } = useAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: data.customerName,
      email: data.customerEmail,
      description: "",
    },
  });

  const { darkMode } = useTheme();
  const [rating, setRating] = useState(0);

  //handle review form
  const handleReview = async (formData) => {
    formData.productId = data.productId;
    formData.rating = rating;

    try {
      const response = await api.post(
        `/products/${data.productId}/review`,
        formData,
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        onClose();
      }
      if (response.data.error) {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
      <div
        className={`${
          darkMode ? "dark" : "bg-white"
        }  rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-4">Leave your opinion</h2>
          <button
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        <form onSubmit={handleSubmit(handleReview)} className="space-y-4">
          <Field label={"Name"} error={errors.name}>
            <input
              {...register("name", { required: "Name is required." })}
              className={`${
                darkMode ? "dark:bg-gray-700 dark:text-white" : ""
              } auth-input w-full p-2 border rounded-md`}
              type="text"
              name="name"
              id="name"
              placeholder="Name"
            />
          </Field>
          <Field label={"Email"} error={errors.email}>
            <input
              {...register("email", { required: "Email is required." })}
              className={`${
                darkMode ? "dark:bg-gray-700 dark:text-white" : ""
              } auth-input w-full p-2 border rounded-md`}
              type="email"
              name="email"
              id="email"
              placeholder="Email"
            />
          </Field>
          <Field label="Description" error={errors.description}>
            <textarea
              {...register("description", {
                required: "Description is required.",
              })}
              className={`auth-input w-full p-2 border rounded-md resize-none ${
                darkMode ? "dark:bg-gray-700 dark:text-white" : ""
              }`}
              type="text"
              name="description"
              id="description"
              placeholder="Write about product..."
              rows={4}
            ></textarea>
          </Field>
          <StarRating rating={rating} setRating={setRating} />
          <Button
            value={"Submit Review"}
            bg={"bg-green-600"}
            hoverBg={"bg-green-800"}
          />
        </form>
      </div>
    </div>
  );
};
export default CustomerReview;
