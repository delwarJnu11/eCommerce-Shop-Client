import { useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import RegisterImage from "../assets/register.png";
import UserImage from "../assets/signin.gif";
import SignUpForm from "../components/auth/SignUpForm";
import { imagetoBase64 } from "../utils/imageToBase64";

const SignUp = () => {
  const [image, setImage] = useState(null);
  const fileUploaderRef = useRef();

  //handle Image upload
  const handleFileUpload = () => {
    fileUploaderRef.current.addEventListener("change", handleUploadImage);
    fileUploaderRef.current.click();
  };

  //handle image upload
  const handleUploadImage = async () => {
    for (const file of fileUploaderRef.current.files) {
      const img = await imagetoBase64(file);
      setImage(img);
    }
  };

  return (
    <div className="container mx-auto lg:grid grid-cols-2 place-items-center gap-4">
      <div className="hidden md:block lg:w-full">
        <img src={RegisterImage} alt="Login Image" />
      </div>
      <div className="min-w-full lg:ml-6 lg:px-6 mt-6 px-2 mb-10">
        <div className="flex items-center justify-center">
          <div
            className={`w-[170px] h-[170px] rounded-full ${
              image && "border-4 p-2 border-red-600"
            }`}
          >
            <img
              className="w-full rounded-full overflow-hidden relative"
              src={image ?? UserImage}
              alt="Avatar"
            />
          </div>
          <div className="absolute top-56 right-64 cursor-pointer">
            <MdEdit onClick={handleFileUpload} title="upload image" size={25} />
          </div>
          <input
            id="image"
            name="image"
            type="file"
            ref={fileUploaderRef}
            hidden
          />
        </div>
        <SignUpForm image={image} />
        <p className="my-5">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className=" text-red-600 hover:text-red-700 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignUp;
