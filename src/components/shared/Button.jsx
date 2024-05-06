const Button = ({ value, buttonAction, bg, hoverBg }) => {
  return (
    <button
      onClick={buttonAction}
      className={`${bg} text-white border-none focus-within:outline-none px-4 py-2 hover:${hoverBg} rounded-md hover:scale-105 transition-all`}
    >
      {value}
    </button>
  );
};
export default Button;
