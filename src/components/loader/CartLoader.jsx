const CartLoader = () => {
  return (
    <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg p-4 mb-4">
      {/* Left side (image) */}
      <div className="md:w-1/3 h-40 mb-4 md:mb-0 md:mr-4 relative">
        <div className="bg-slate-200 w-full h-full animate-pulse"></div>
      </div>
      {/* Right side (product details) */}
      <div className="md:w-2/3">
        <h2 className="bg-slate-200 w-full p-2 animate-pulse rounded my-2"></h2>
        <p className="bg-slate-200 w-[50%] p-2 animate-pulse rounded"></p>
        <p className="bg-slate-200 w-[50%] p-2 animate-pulse rounded my-2"></p>
        <div className="ml-auto flex mt-2">
          <button className="text-white font-bold px-3 py-1 bg-slate-200 rounded-l"></button>
          <input
            type="number"
            className="w-12 text-center bg-gray-200 py-1 font-bold"
            disabled
            value=""
          />
          <button className="text-white font-bold px-3 py-1 bg-slate-200 rounded-r"></button>
        </div>
      </div>
    </div>
  );
};
export default CartLoader;
