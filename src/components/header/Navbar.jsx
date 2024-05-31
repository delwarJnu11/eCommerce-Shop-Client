import { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BsCart3 } from "react-icons/bs";
import { CiHeart, CiLogout, CiUser } from "react-icons/ci";
import { GrUserAdmin } from "react-icons/gr";
import { RiListOrdered2 } from "react-icons/ri";
import { SiShopee } from "react-icons/si";
import { TbOutlet, TbSearch } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { actions } from "../../actions";
import { api } from "../../api";
import { useCart } from "../../hooks/useCart";
import useFetchCartProducts from "../../hooks/useFetchCartProducts";
import { useUser } from "../../hooks/useUser";

const Navbar = () => {
  const { state, dispatch } = useUser();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);
  const { state: cartState, dispatch: cartDispatch } = useCart();

  const { cart } = useFetchCartProducts();

  // get user details
  useEffect(() => {
    const fetchUser = async () => {
      dispatch({ type: actions.user.USER_DATA_FETCHING });
      try {
        const response = await api.get("/user-details", {
          withCredentials: true,
        });
        if (response.status === 200) {
          dispatch({
            type: actions.user.USER_DATA_FETCHED,
            data: response.data,
          });
        }
      } catch (error) {
        dispatch({
          type: actions.user.USER_DATA_FETCHING_ERROR,
          error: error.message,
        });
      }
    };
    fetchUser();
  }, [dispatch]);

  const user = state?.data?.data;

  //handle logout
  const handleLogout = async () => {
    try {
      const response = await api.get("/logout", { withCredentials: true });
      if (response.status === 200) {
        cartDispatch({ type: actions.cart.CLEAR_CART_DATA });
        dispatch({ type: actions.user.USER_LOGGED_OUT, data: {} });
        toast.success(response.data.message);
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //handle change
  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (search) {
      navigate(`/search?q=${search}`);
    }
  };

  const handleLogin = () => {
    if (user?._id) {
      setShowDropdown(!showDropdown);
    } else {
      navigate("/login");
    }
  };

  const cartLength = cartState?.cart?.length || 0;
  const totalPrice = cart?.reduce(
    (prev, curr) => prev + curr?.productId?.sellingPrice * curr.quantity,
    0
  );

  //check loading state
  {
    state?.data?.loading && <p>Loading...</p>;
  }
  //check error state
  {
    state?.data?.error && (
      <div className="text-rose-500 text-sm">{state?.error}</div>
    );
  }
  return (
    <nav className="flex flex-col sm:flex-row justify-between items-center gap-4 py-2">
      <Link
        to="/"
        className="flex flex-col space-y-1 items-center sm:items-start"
      >
        <SiShopee color="#FF6500" size={65} />
        <span className="text-[15px] font-semibold leading-[160%] tracking-wider text-[#FF6500] uppercase">
          Shopee
        </span>
      </Link>
      <div className="flex justify-around items-center gap-6">
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <AiOutlineHome size={30} />
          <span className="text-[#A7BCEC] text-[15px] font-extrabold leading-5 uppercase">
            Home
          </span>
        </Link>
        <Link to="/shop" className="flex items-center gap-2 cursor-pointer">
          <TbOutlet size={30} />
          <span className="text-[#A7BCEC] text-[15px] font-extrabold leading-5 uppercase">
            Shop
          </span>
        </Link>
        <div className="hidden md:flex items-center p-2 rounded-md bg-gray-700 transition-colors duration-300 focus-within:bg-gray-600">
          <TbSearch size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none ml-2 text-gray-100 placeholder-gray-500 focus:placeholder-white w-full"
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="flex gap-4">
        {/* Wishlist */}
        <div className="relative">
          <CiHeart size={30} />
          <div className="w-5 h-5 bg-[#FF6500] rounded-full flex justify-center items-center absolute -top-2 -right-[10px] -sm:right-[0.5rem]">
            <span className="text-white text-[10px]">
              {cartState?.wishlist?.length ? cartState?.wishlist?.length : 0}
            </span>
          </div>
        </div>

        {/* Cart */}
        {user?._id && (
          <Link to="/cart" className="flex items-center gap-2">
            <div className="relative">
              <BsCart3 size={30} />
              <div className="w-5 h-5 bg-[#FF6500] rounded-full flex justify-center items-center absolute -top-2 -right-2">
                <span className="text-white text-[10px]">{cartLength}</span>
              </div>
            </div>
            <div className="hidden sm:flex flex-col items-start">
              <span className="text-[#848484] text-[12px] leading-3">
                My Cart
              </span>
              <p className="text-[#A7BCEC] text-[15px] font-extrabold leading-5">
                ৳{cartLength ? totalPrice : 0.0}
              </p>
            </div>
          </Link>
        )}
        {/* Login */}
        <div
          className="flex items-center gap-1 sm:gap-2 relative cursor-pointer"
          onClick={handleLogin}
        >
          <CiUser size={30} />
          <div className="hidden sm:flex flex-col items-start">
            <span className="text-[#848484] text-[12px] leading-3">
              My Account
            </span>
            <p className="text-[#A7BCEC] text-[15px] font-extrabold leading-5">
              {user?._id ? user?.name : "Login"}
            </p>
          </div>
          {showDropdown && user?._id && (
            <div className="absolute top-[63px] -right-[34px] bg-gray-600 text-white p-2 rounded-bl-md rounded-br-md shadow-md md:max-w-sm z-30">
              <nav className="flex flex-col gap-2">
                {user.role === "ADMIN" && (
                  <Link
                    className="whitespace-nowrap text-base tracking-wider font-semibold flex items-center gap-2 hover:bg-[#FF8A08] hover:scale-105 transition-all px-2 py-2 rounded-sm"
                    to={"/admin-panel/products"}
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <GrUserAdmin color="#fff" size={20} /> Admin Panel
                  </Link>
                )}
                <Link
                  className="whitespace-nowrap text-base tracking-wider font-semibold flex items-center gap-2 hover:bg-[#FF8A08] hover:scale-105 transition-all px-2 py-2 rounded-sm"
                  to={`/track/order/${user?.email}`}
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <RiListOrdered2 color="#fff" size={20} /> My Orders
                </Link>
                <button
                  className="hover:bg-[#FF6500] bg-[#C40C0C] hover:scale-105 transition-all px-4 py-1 rounded-md whitespace-nowrap text-base tracking-wider font-semibold flex items-center gap-2"
                  onClick={handleLogout}
                >
                  <CiLogout color="#fff" size={20} /> Logout
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
