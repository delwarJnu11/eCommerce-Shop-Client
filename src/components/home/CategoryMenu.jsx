import { Link } from "react-router-dom";
import { productCategory } from "../../constants";
import { useTheme } from "../../hooks/useTheme";

const CategoryMenu = () => {
  const { darkMode } = useTheme();
  return (
    <div
      className={`${
        darkMode ? "dark" : "bg-gray-50"
      } hidden md:block md:w-1/6 md:mx-auto shadow-lg overflow-hidden`}
    >
      {productCategory.map((category) => (
        <Link
          to={`/products/category/${category.value}`}
          key={category.id}
          className="flex items-center space-x-2 mt-1 p-1 cursor-pointer hover:scale-105 transition-all hover:bg-[#FF8A08] text-[#757575] hover:text-white hover:mx-2 hover:rounded-md"
        >
          <div>{category.icon}</div>
          <span className="text-[15px]">{category.label}</span>
        </Link>
      ))}
    </div>
  );
};
export default CategoryMenu;
