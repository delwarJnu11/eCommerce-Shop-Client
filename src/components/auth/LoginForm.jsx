import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { actions } from "../../actions";
import { useAuth } from "../../hooks/useAuth";
import useFetchCartProducts from "../../hooks/useFetchCartProducts";
import { useTheme } from "../../hooks/useTheme";
import { useUser } from "../../hooks/useUser";
import Button from "../shared/Button";
import Field from "../shared/Field";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useUser();
  const { darkMode } = useTheme();
  const { fetchCartProducts, cart } = useFetchCartProducts();
  const { setAuthenticated, setUserId } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  axios.defaults.withCredentials = true;
  //handle user login
  const handleLogin = async (formData) => {
    const loginData = {
      email: formData.email,
      password: formData.password,
    };
    try {
      const response = await axios.post(
        "https://e-commerce-shop-backend.vercel.app/api/auth/login",
        loginData
      );
      if (response.data.success) {
        dispatch({
          type: actions.user.USER_DATA_FETCHED,
          data: response.data,
        });
        setAuthenticated(true);
        setUserId(response?.data?.data?._id);
        navigate("/");
        toast.success(response.data.message);

        if (cart.length) {
          fetchCartProducts();
        }
      }

      if (response.data.error) {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setError("root.random", {
        type: "random",
        message: error.message,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <Field label={"Email"} error={errors.email}>
        <input
          {...register("email", {
            required: "Email is required.",
          })}
          className={`${darkMode && "dark"} auth-input`}
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
            })}
            className={`${darkMode && "dark"} auth-input`}
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
      <Field>
        <Button
          value={"Login"}
          bg={"bg-orange-600"}
          hoverBg={"bg-orange-700"}
        />
      </Field>
    </form>
  );
};
export default LoginForm;
