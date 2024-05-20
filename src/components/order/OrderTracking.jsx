import React from "react";
import { STATUS } from "../../constants";

const OrderTracking = ({ currentIndex }) => {
  return (
    <div className="hidden  md:flex justify-between items-center mt-4">
      {STATUS.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center mt-5">
            <div
              className={`w-16 h-16 flex items-center justify-center rounded-full border-2 ${
                index <= currentIndex
                  ? "border-green-500 bg-green-500"
                  : "border-gray-300"
              }`}
            >
              {index <= currentIndex && (
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              )}
            </div>
            <div
              className={`mt-2 text-xs ${
                index <= currentIndex
                  ? "text-green-500 font-semibold"
                  : "text-gray-500"
              }`}
            >
              {step}
            </div>
          </div>
          {index < STATUS.length - 1 && (
            <div className="flex-1 flex items-center">
              <div
                className={`h-1 w-full ${
                  index < currentIndex ? "bg-green-500" : "bg-gray-300"
                } ${index === currentIndex ? "animate-pulse" : ""}`}
              ></div>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
export default OrderTracking;
