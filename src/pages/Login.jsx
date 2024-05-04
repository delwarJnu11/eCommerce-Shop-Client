import { Link } from "react-router-dom";
import LoginImage from "../assets/login.png";
import UserImage from "../assets/signin.gif";
import LoginForm from "../components/auth/LoginForm";

const Login = () => {
  return (
    <div className="container mx-auto lg:grid grid-cols-2 place-items-center gap-4">
      <div className="hidden md:block lg:w-full">
        <img src={LoginImage} alt="Login Image" />
      </div>
      <div className="min-w-full lg:ml-6 lg:px-6 mt-6 px-2 mb-10">
        <div className="flex items-center justify-center">
          <img src={UserImage} alt="Avatar" />
        </div>
        <LoginForm />
        <p className="my-5">
          Don&#39;t have account ?{" "}
          <Link
            to={"/sign-up"}
            className=" text-red-600 hover:text-red-700 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Login;
