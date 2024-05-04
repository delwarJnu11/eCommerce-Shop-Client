import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "../shared/Button";
import Field from "../shared/Field";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <form onSubmit={handleSubmit()}>
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
            })}
            className="auth-input"
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
        <Button value={"Login"} />
      </Field>
    </form>
  );
};
export default LoginForm;
