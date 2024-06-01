import { MdCall, MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

const TopBar = () => {
  const { state } = useUser();
  const user = state?.data?.data;
  return (
    <div className="hidden container mx-auto md:flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          <MdCall size={20} color="#FF8A08" />
          <p className="text-sm font-semibold text-[#FF8A08]">
            +880 1749497676
          </p>
        </div>
        <div className="flex items-center gap-3">
          <MdEmail size={20} color="#FF8A08" />
          <p className="text-sm font-semibold text-[#FF8A08]">
            shopee@gmail.com
          </p>
        </div>
      </div>
      <div>
        <p className="capitalize text-sm font-medium leading-4 tracking-wide">
          free shoping on all orders over ৳ 5000
        </p>
      </div>
      <div className="flex items-center gap-4">
        <p className="capitalize text-sm font-medium leading-4 tracking-wide py-3 cursor-pointer">
          <Link to={`/track/order/${user?.email}`}>Track Order</Link>
        </p>
        <p className="capitalize text-sm font-medium leading-4 tracking-wide py-3 cursor-pointer">
          <Link to="/about">About</Link>
        </p>
        <p className="capitalize text-sm font-medium leading-4 tracking-wide py-3 cursor-pointer">
          <Link to="/contact">Contact</Link>
        </p>
      </div>
    </div>
  );
};
export default TopBar;
