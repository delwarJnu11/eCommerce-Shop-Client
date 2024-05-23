import { MdCall } from "react-icons/md";
import { Link } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

const TopBar = () => {
  const { state } = useUser();
  const user = state?.data?.data;
  return (
    <div className="container mx-auto flex justify-between items-center">
      <div>
        <p className="capitalize text-sm font-medium leading-4 tracking-wide">
          free shoping on all orders over ৳ 5000
        </p>
      </div>
      <div className="flex items-center gap-3">
        <MdCall size={20} color="#FF8A08" />
        <p className="text-md font-bold text-[#FF8A08]">+880 1749497676</p>
      </div>
      <div className="flex items-center gap-4">
        <p className="capitalize text-sm font-medium leading-4 tracking-wide py-3 cursor-pointer">
          <Link to={`/track/order/${user?.email}`}>Track Order</Link>
        </p>
        <p className="capitalize text-sm font-medium leading-4 tracking-wide py-3 cursor-pointer">
          About
        </p>
        <p className="capitalize text-sm font-medium leading-4 tracking-wide py-3 cursor-pointer">
          Contact
        </p>
      </div>
    </div>
  );
};
export default TopBar;
