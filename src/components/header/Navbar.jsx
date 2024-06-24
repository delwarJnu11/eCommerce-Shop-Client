import { AnimatePresence, motion } from "framer-motion";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BsCart3 } from "react-icons/bs";
import { CiHeart, CiLogout, CiUser } from "react-icons/ci";
import { FaBars, FaTimes } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { RiListOrdered2 } from "react-icons/ri";
import { SiShopee } from "react-icons/si";
import { TbOutlet, TbSearch } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { actions } from "../../actions";
import { useAuth } from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { useCart } from "../../hooks/useCart";
import useFetchCartProducts from "../../hooks/useFetchCartProducts";
import { useUser } from "../../hooks/useUser";

const Navbar = () => {
  const { api } = useAxios();
  const { state, dispatch } = useUser();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);
  const { state: cartState, dispatch: cartDispatch } = useCart();
  const { authenticated, setAuthenticated } = useAuth();
  const { cart, fetchCartProducts } = useFetchCartProducts();
  // get user details
  useEffect(() => {
    const fetchUser = async () => {
      dispatch({ type: actions.user.USER_DATA_FETCHING });
      try {
        const response = await api.get("/auth/user-details", {
          withCredentials: true,
        });
        if (response.data.success) {
          dispatch({
            type: actions.user.USER_DATA_FETCHED,
            data: response.data,
          });
        }
      } catch (error) {
        dispatch({
          type: actions.user.USER_DATA_FETCHING_ERROR,
          error: error?.response?.data?.message,
        });
      }
    };
    if (authenticated) {
      fetchUser();
    }
  }, [dispatch, api, authenticated]);

  useEffect(() => {
    fetchCartProducts;
  }, [fetchCartProducts]);

  const user = state?.data?.data;

  //handle logout
  const handleLogout = async () => {
    try {
      const response = await api.post("/auth/logout");
      if (response.status === 200) {
        cartDispatch({ type: actions.cart.CLEAR_CART_DATA });
        dispatch({ type: actions.user.USER_LOGGED_OUT, data: {} });
        toast.success(response.data.message);
        Cookies.remove("accessToken");
        setAuthenticated(false);
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
    if (search.trim()) {
      navigate(`/search?q=${search}`);
      setTimeout(() => setSearch(""), 4000);
    }
  };

  const handleLogin = () => {
    if (authenticated) {
      setShowDropdown(!showDropdown);
    } else {
      navigate("/login");
    }
  };
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const cartLength = cartState?.cart?.length || 0;
  const totalPrice = cart?.reduce((prev, curr) => {
    const sellingPrice = parseFloat(curr?.productId?.sellingPrice) || 0;
    const quantity = parseInt(curr?.quantity, 10) || 0;
    return prev + sellingPrice * quantity;
  }, 0);
  //check loading state
  {
    state?.loading && <p>Loading...</p>;
  }
  //check error state
  {
    state?.error && <div className="text-rose-500 text-sm">{state?.error}</div>;
  }
  return (
    <nav className="flex flex-col sm:flex-row justify-between items-center gap-4 md:pt-2 shadow-md">
      {/* Logo */}
      <Link
        to="/"
        className="flex md:flex-col items-center sm:flex-row sm:items-start space-y-1 sm:space-y-0"
      >
        <SiShopee color="#FF6500" size={65} />
        <span className="text-sm font-semibold leading-[160%] tracking-wide text-[#FF6500] uppercase">
          Shopee
        </span>
      </Link>

      {/* Links and Search Input */}
      <div className="hidden sm:flex justify-around items-center gap-6 w-full sm:w-auto">
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

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Hamburger Menu for Small Screens */}
        <button className="sm:hidden p-2 text-white" onClick={toggleMenu}>
          {menuOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
        </button>

        {/* Wishlist */}
        {authenticated && user?._id && (
          <div className="relative">
            <CiHeart size={30} />
            <div className="w-5 h-5 bg-[#FF6500] rounded-full flex justify-center items-center absolute -top-2 -right-[12px] sm:right-0.5">
              <span className="text-white text-[10px]">
                {cartState?.wishlist?.length && authenticated
                  ? cartState?.wishlist?.length
                  : 0}
              </span>
            </div>
          </div>
        )}

        {/* Cart */}
        {authenticated && user?._id && (
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
                ৳{cartLength > 0 ? totalPrice : 0.0}
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
            <Link
              to={"/login"}
              className="text-[#A7BCEC] text-[15px] font-extrabold leading-5"
            >
              {user?._id && authenticated ? user?.name : "Login"}
            </Link>
          </div>
          {showDropdown && user?._id && authenticated && (
            <motion.div
              className="absolute top-16 right-0 bg-gray-600 text-white p-2 rounded-bl-md rounded-br-md shadow-md z-30"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ yx: "100%" }}
              transition={{ type: "tween", duration: 0.7, ease: "easeInOut" }}
            >
              <nav className="flex flex-col gap-2">
                {user?.role === "ADMIN" && (
                  <Link
                    className="whitespace-nowrap text-base tracking-wider font-semibold flex items-center gap-2 hover:bg-[#FF8A08] hover:scale-105 transition-all px-2 py-2 rounded-sm"
                    to="/admin-panel/products"
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
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="lg:hidden bg-gray-900 shadow-md space-y-4 p-4 rounded-md"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-140%" }}
            transition={{ type: "tween", duration: 0.7, ease: "easeInOut" }}
          >
            <Link
              to="/"
              className="flex items-center gap-2 cursor-pointer"
              onClick={toggleMenu}
            >
              <AiOutlineHome size={30} />
              <span className="text-[#A7BCEC] text-[15px] font-extrabold leading-5 uppercase">
                Home
              </span>
            </Link>
            <Link
              to="/shop"
              className="flex items-center gap-2 cursor-pointer"
              onClick={toggleMenu}
            >
              <TbOutlet size={30} />
              <span className="text-[#A7BCEC] text-[15px] font-extrabold leading-5 uppercase">
                Shop
              </span>
            </Link>
            <div className="flex items-center p-2 rounded-md bg-gray-700">
              <TbSearch size={20} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none ml-2 text-gray-100 placeholder-gray-500 w-full"
                value={search}
                onChange={handleSearch}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
