import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../shared/Button";
import Field from "../shared/Field";

const SignUpForm = ({ image }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  //handle sign up
  const handleSignUp = async (formData) => {
    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      image,
    };

    //check 2 password matched or not
    if (formData.password !== formData.confirmPassword) {
      setError("confirmPassword", {
        type: "notMatched",
        message: "Password does not match.",
      });
    } else {
      setError("confirmPassword", null);
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/register",
        data
      );
      if (response.status === 201) {
        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/login");
        }
      }
      if (response.data.error) {
        toast.error(response.data.message);
      }
    } catch (error) {
      setError("root.random", {
        type: "random",
        message: error.message,
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(handleSignUp)}>
      <Field label={"Name"} error={errors.name}>
        <input
          {...register("name", {
            required: "Name is required.",
          })}
          className="auth-input"
          type="text"
          name="name"
          id="name"
          placeholder="name"
        />
      </Field>
      <Field label={"Email"} error={errors.email}>
        <input
          {...register("email", {
            required: "Email is required.",
          })}
          className="auth-input"
          type="email"
          name="email"
          id="email"
          placeholder="email"
        />
      </Field>
      <Field label={"Password"} error={errors.password}>
        <div className="relative">
          <input
            {...register("password", {
              required: "Password is required.",
              minLength: {
                value: 8,
                message: "Your password must be at least 8 characters",
              },
            })}
            className={`auth-input ${
              errors.password ? "border-red-500" : "border-gray-200"
            }`}
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="password"
          />
          <span
            className="absolute top-[10px] lg:top-4 right-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </span>
        </div>
      </Field>
      <Field label={"Confirm Password"} error={errors.confirmPassword}>
        <div className="relative">
          <input
            {...register("confirmPassword", {
              required: "confirm Password is required.",
            })}
            className={`auth-input ${
              errors.confirmPassword ? "border-red-500" : "border-gray-200"
            }`}
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            id="confirmPassword"
            placeholder="confirm password"
          />
          <span
            className="absolute top-[10px] lg:top-4 right-3"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <FaEyeSlash size={20} />
            ) : (
              <FaEye size={20} />
            )}
          </span>
        </div>
      </Field>
      <p className="text-red-500 my-2">{errors?.root?.random?.message}</p>
      <Field>
        <Button value={"Register"} bg={"bg-red-500"} hoverBg={"bg-red-700"} />
      </Field>
    </form>
  );
};
export default SignUpForm;
