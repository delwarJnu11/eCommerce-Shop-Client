import { useForm } from "react-hook-form";
import { api } from "../../api";
import { useTheme } from "../../hooks/useTheme";
import Button from "../shared/Button";
import Field from "../shared/Field";

const CheckOutForm = ({ cart, user }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      address: "",
      currency: "BDT",
      postalCode: "",
      phone: "",
    },
  });

  const { darkMode } = useTheme();

  //store cart product details
  const cartProductDetails = cart.map((item) => ({
    productId: item.productId._id,
    quantity: item.quantity,
  }));

  console.log(cartProductDetails);

  // Handle checkout
  const onCheckout = async (data) => {
    data.cartProductDetails = cartProductDetails;
    try {
      const response = await api.post("/order", data, {
        withCredentials: true,
      });
      if (response?.data?.url) {
        window.location.replace(response?.data?.url);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onCheckout)}>
      <Field label={"Name"} error={errors.name}>
        <input
          {...register("name", { required: "Name is required." })}
          className={`${darkMode ? "dark" : ""} auth-input`}
          type="text"
          name="name"
          id="name"
          placeholder="Name"
        />
      </Field>
      <Field label={"Email"} error={errors.email}>
        <input
          {...register("email", { required: "Email is required." })}
          className={`${darkMode ? "dark" : ""} auth-input`}
          type="email"
          name="email"
          id="email"
          placeholder="Email"
        />
      </Field>
      <Field label="Address" error={errors.address}>
        <input
          {...register("address", { required: "Address is required." })}
          className={`${darkMode ? "dark" : ""} auth-input`}
          type="text"
          name="address"
          id="address"
          placeholder="Address"
        />
      </Field>
      <Field label="Currency" error={errors.currency}>
        <select
          {...register("currency", { required: "Currency is required." })}
          className={`${darkMode ? "dark" : ""} auth-input`}
          name="currency"
          id="currency"
        >
          <option value="BDT">BDT</option>
          <option value="USD">USD</option>
          <option value="EURO">EURO</option>
        </select>
      </Field>
      <Field label="Postal Code" error={errors.postalCode}>
        <input
          {...register("postalCode", { required: "Postal Code is required." })}
          className={`${darkMode ? "dark" : ""} auth-input`}
          type="text"
          name="postalCode"
          id="postalCode"
          placeholder="Postal Code"
        />
      </Field>
      <Field label="Phone Number" error={errors.phone}>
        <input
          {...register("phone", { required: "Phone number is required." })}
          className={`${darkMode ? "dark" : ""} auth-input`}
          type="text"
          name="phone"
          id="phone"
          placeholder="Phone Number"
        />
      </Field>
      <p className="text-red-500 my-2">{errors?.root?.random?.message}</p>
      <Field>
        <Button
          value={"Payment"}
          bg={"bg-orange-600"}
          hoverBg={"bg-orange-700"}
        />
      </Field>
    </form>
  );
};

export default CheckOutForm;
