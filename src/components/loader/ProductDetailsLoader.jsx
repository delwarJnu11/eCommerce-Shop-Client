const ProductDetailsLoader = ({ loadingStateImages }) => {
  return (
    <div className="container mx-auto flex gap-3 overflow-hidden py-4">
      {/* image section */}
      <div className="w-[50%] flex sm:flex-col md:flex-row gap-2 overflow-hidden">
        <div className="w-1/6 md:h-[350px] flex flex-col bg-slate-300 p-2 animate-pulse">
          {loadingStateImages?.map((image, index) => (
            <div key={index} className="w-20 h-20 my-1 cursor-pointer"></div>
          ))}
        </div>
        <div className="w-full md:max-h-[350px] flex justify-center items-center  bg-slate-300 p-2 animate-pulse"></div>
      </div>
      {/* product details */}
      <div className="w-[50%] flex flex-col gap-2">
        <h2 className="text-2xl my-2 font-semibold text-gray-500 text-ellipsis line-clamp-1 w-full bg-slate-300 p-2 animate-pulse"></h2>
        <p className="w-full my-2 text-white text-center rounded-full text-sm md:text-md  bg-slate-300 p-2 animate-pulse"></p>
        <div className="flex items-center gap-2">
          <p className="text-2xl my-2 font-semibold text-orange-600 w-full bg-slate-300 p-2 animate-pulse">
            <span className="text-3xl font-bold"></span>
          </p>
          <span className="text-md w-full my-2 bg-slate-300 p-2 animate-pulse"></span>
        </div>
        <p className="bg-slate-300 p-2 w-full my-2 animate-pulse"></p>
        <div className="w-[25%]">
          <button className=" bg-slate-300 p-2 w-full my-2 animate-pulse text-base text-white md:text-md px-4 py-2 rounded-lg shadow-lg"></button>
        </div>
      </div>
    </div>
  );
};
export default ProductDetailsLoader;
