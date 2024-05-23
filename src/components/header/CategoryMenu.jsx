import { productCategory } from "../../constants";

const CategoryMenu = () => {
  return (
    <div className="hidden md:block md:w-1/6 bg-gray-50 md:mx-auto shadow-lg">
      {productCategory.map((category) => (
        <div
          key={category.id}
          className="flex items-center space-x-2 mt-1 p-1 cursor-pointer hover:scale-105 transition-all hover:bg-[#FF8A08] text-[#757575] hover:text-white hover:rounded-md"
        >
          <div>{category.icon}</div>
          <span className="text-[15px]">{category.label}</span>
        </div>
      ))}
    </div>
  );
};
export default CategoryMenu;
