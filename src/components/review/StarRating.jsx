const StarRating = ({ rating, setRating }) => {
  const STAR = new Array(5).fill(null);
  return (
    <div className="flex space-x-1">
      {STAR.map((_, index) => {
        index += 1;
        return (
          <button
            key={index}
            type="button"
            className={`text-2xl ${
              index <= rating ? "text-orange-600" : "text-gray-500"
            }`}
            onClick={() => setRating(index)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
