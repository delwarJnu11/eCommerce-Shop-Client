const ReviewLoader = () => {
  return (
    <div className={`bg-gray-700 flex gap-4 p-4 rounded-lg`}>
      <div className="w-20 h-20 bg-gray-500 p-2 animate-pulse"></div>
      <div className="flex flex-col space-y-1 p-2 animate-pulse">
        <h2 className="text-base font-medium bg-gray-500 rounded-md p-2 animate-pulse"></h2>
        <p className="text-sm font-normal text-gray-400 bg-gray-500 rounded-md p-2 animate-pulse"></p>
        <p className="text-base text-gray-400 font-normal italic bg-gray-500 rounded-md p-2 animate-pulse"></p>
        <div className="flex space-x-1 p-2 animate-pulse">
          {[...Array(5)].map((_, index) => {
            index += 1;
            return (
              <button
                key={index}
                type="button"
                className={`text-2xl ${
                  index <= 5 && "text-gray-500"
                } p-2 animate-pulse`}
              >
                <span className="star">&#9733;</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default ReviewLoader;
