const OrderStatusImage = ({ url }) => {
  return (
    <div className="max-w-sm max-h-full mx-auto p-4">
      <img
        src={url}
        alt="image"
        className="w-full h-full object-scale-down mix-blend-multiply"
      />
    </div>
  );
};
export default OrderStatusImage;
