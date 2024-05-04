import { FaRegUserCircle, FaShoppingCart } from "react-icons/fa";
import { HiSearch } from "react-icons/hi";
import { Link } from "react-router-dom";
import Button from "./Button";

const Header = () => {
  return (
    <header className="bg-white  shadow-md  w-full py-4 h-20">
      <div className="container mx-auto flex items-center justify-between h-full">
        <div>
          <Link to={"/"} className="text-lg lg:text-2xl font-bold">
            E-SHOP
          </Link>
        </div>
        <div className="hidden md:flex items-center justify-center">
          <input
            className="px-2 py-2 border-gray-300 w-full focus-within:outline-none focus-within:shadow-md"
            type="search"
            name="search"
            id="search"
            placeholder="search products..."
          />
          <div className="bg-orange-600 h-9 w-12 rounded-tr-full rounded-br-full flex items-center justify-center -ml-1">
            <HiSearch size={25} color="white" />
          </div>
        </div>
        <div className="flex justify-center items-center gap-8">
          <div className="flex items-center justify-center relative">
            <span>
              <FaShoppingCart size={35} />
            </span>
            <span className="w-8 h-8 text-sm text-white rounded-full bg-orange-600 p-2 flex items-center justify-center absolute -top-5 -right-5">
              0
            </span>
          </div>
          <div>
            <FaRegUserCircle size={35} />
          </div>
          <div>
            <Link to={"/login"}>
              <Button value={"Login"} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
