const NotFound = ({ image, title }) => {
  return (
    <div className="container mx-auto py-16">
      <h2 className="text-lg font-medium text-red-500 text-center">{title}</h2>
      <div className="w-[200px] h-[200px] mx-auto">
        <img className="w-full h-full object-cover" src={image} alt="" />
      </div>
      <div className="flex justify-center items-center">
        <button
          onClick={() => window.history.back(-1)}
          className="bg-[#C40C0C] text-white rounded-md font-medium text-sm uppercase px-4 py-2"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};
export default NotFound;
