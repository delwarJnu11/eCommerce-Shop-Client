import { IoBagCheckSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-transparent">
      <div className="text-center p-6 bg-gray-200 rounded-lg shadow-lg">
        <div className="flex justify-center items-center mb-4">
          <IoBagCheckSharp size={60} color="#22c55e" />
        </div>
        <h1 className="text-2xl font-semibold text-green-500">Thank You!</h1>
        <p className="mt-2 text-gray-700 text-md">Payment done Successfully</p>
        <p className="mt-1 text-gray-500">click here to return to home page</p>
        <Link to={"/"}>
          <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
