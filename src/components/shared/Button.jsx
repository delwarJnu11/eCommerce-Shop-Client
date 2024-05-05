const Button = ({ value, buttonAction }) => {
  return (
    <button
      onClick={buttonAction}
      className="bg-red-600 text-white border-none focus-within:outline-none px-4 py-2 hover:bg-red-700 rounded-md"
    >
      {value}
    </button>
  );
};
export default Button;
