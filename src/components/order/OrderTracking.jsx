import { STATUS } from "../../constants";
import OrderStatusImage from "./OrderStatusImage";

const OrderTracking = ({ order, onClose }) => {
  const orderHistory = order?.statusHistory;

  const lastCompletedIndex = STATUS.findIndex(
    (step) => step === orderHistory[orderHistory.length - 1]?.status
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50 backdrop-blur-sm">
      <div className="relative bg-white p-4 rounded-md shadow-lg w-2/3 mx-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-[#C40C0C] text-white px-2 py-2 rounded-full"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <div className="mt-8">
          <div className="mb-4">
            <h2 className="font-bold text-lg uppercase text-[#414141]">
              Order ID: <span className="text-[#FF6500]">#{order._id}</span>
            </h2>
            <p className="text-[#7c7b7b] uppercase font-semibold text-[12px] my-2">
              the order is{" "}
              <span className="uppercase font-bold">
                {STATUS[lastCompletedIndex]}
              </span>
            </p>
          </div>
          <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-lg w-full mx-auto">
            {STATUS.map((step, index) => (
              <div
                key={index}
                className="flex-1 flex flex-col items-center relative"
              >
                <div
                  className={`w-8 h-8 rounded-full ${
                    index <= lastCompletedIndex ? "bg-green-500" : "bg-gray-300"
                  } flex items-center justify-center z-20`}
                >
                  {index <= lastCompletedIndex && (
                    <svg
                      className="w-5 h-5 text-white"
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
                      />
                    </svg>
                  )}
                </div>
                <p className="mt-2 text-sm text-center">{step}</p>
                {index < STATUS.length - 1 && (
                  <div
                    className={`absolute top-4 left-full w-full border-t-2 z-0 ${
                      index < lastCompletedIndex
                        ? "border-green-500"
                        : "border-gray-300"
                    }`}
                    style={{ transform: "translateX(-50%)" }}
                  ></div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-8">
            {STATUS[lastCompletedIndex] === "Pending" && (
              <OrderStatusImage url={"https://i.ibb.co/sCCh55g/pending.png"} />
            )}
            {STATUS[lastCompletedIndex] === "Confirmed" && (
              <OrderStatusImage url={"https://i.ibb.co/rFH5rdJ/confirm.webp"} />
            )}
            {STATUS[lastCompletedIndex] === "Dispatched" && (
              <OrderStatusImage url={"https://i.ibb.co/yg6sSYL/dispatch.png"} />
            )}
            {STATUS[lastCompletedIndex] === "In Transit" && (
              <OrderStatusImage
                url={"https://i.ibb.co/BGt7WYz/intransit.jpg"}
              />
            )}
            {STATUS[lastCompletedIndex] === "Delivered" && (
              <OrderStatusImage
                url={"https://i.ibb.co/LQ5Bjh4/delivery-success.png"}
              />
            )}
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};
export default OrderTracking;
