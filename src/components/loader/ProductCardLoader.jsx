const ProductCardLoader = () => {
  return (
    <div className="mx-2">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-full h-64 object-scale-down object-fit-scale bg-slate-300 p-2 animate-pulse"></div>
        <div className="p-4 w-full">
          <h2 className="text-gray-800 font-bold text-lg mb-2 text-ellipsis line-clamp-1 bg-slate-300 p-2 animate-pulse w-full"></h2>
          <p className="text-gray-600 text-sm bg-slate-300 p-2 animate-pulse w-full"></p>
          <div className="flex items-center gap-2 mt-2 w-full">
            <p className="text-orange-700 text-base font-bold mt-2 bg-slate-300 p-2 animate-pulse w-full"></p>
            <p className="text-gray-600 line-through bg-slate-300 p-2 animate-pulse w-full"></p>
          </div>
          <div className="flex items-center justify-between w-full">
            <button className="mt-4  text-white py-2 px-4 rounded-lg  focus:outline-none bg-slate-300 p-2 animate-pulse w-full"></button>
            <button className="mt-4  text-white py-2 px-4 rounded-lg  focus:outline-none bg-slate-300 p-2 animate-pulse w-full"></button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductCardLoader;
