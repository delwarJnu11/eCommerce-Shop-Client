import { useEffect, useState } from "react";
import { FaRegUserCircle, FaShoppingCart } from "react-icons/fa";
import { HiMoon, HiSearch, HiSun } from "react-icons/hi";
import { SiShopee } from "react-icons/si";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { actions } from "../../actions";
import { api } from "../../api";
import { ROLE } from "../../constants";
import useFetchCartProducts from "../../hooks/useFetchCartProducts";
import { useTheme } from "../../hooks/useTheme";
import { useUser } from "../../hooks/useUser";
import Button from "./Button";

const Header = () => {
  const { state, dispatch } = useUser();
  const navigate = useNavigate();
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);
  const { fetchCartProducts, cart } = useFetchCartProducts();
  //dark mode
  const { darkMode, setDarkMode } = useTheme();

  // Update cart length when cart state changes
  useEffect(() => {
    fetchCartProducts();
  }, [fetchCartProducts]);

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
        dispatch({ type: actions.cart.CLEAR_CART_DATA });
        dispatch({ type: actions.user.USER_LOGGED_OUT, data: {} });
        toast.success(response.data.message);
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

  const cartLength = cart?.length || 0;

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
    <header
      className={`${
        darkMode ? "dark border-b border-gray-700" : "bg-white"
      } shadow-md  w-full py-4 h-20 fixed z-40`}
    >
      <div className="container mx-auto flex items-center justify-between py-6 h-full">
        <Link to={"/"} className="flex items-center justify-center gap-1">
          <SiShopee size={60} color="#ea5a0c" />
          <p
            className={
              darkMode
                ? "text-white uppercase text-md font-extrabold hidden md:block"
                : "text-gray-700 uppercase text-md font-extrabold hidden md:block"
            }
          >
            Shopee
          </p>
        </Link>
        <div className="hidden md:flex items-center justify-center">
          <input
            className={`${
              darkMode && "dark"
            } px-4 py-2 border-b border-gray-300 w-full focus-within:outline-none focus-within:shadow-md`}
            type="search"
            name="search"
            id="search"
            placeholder="search products..."
            value={search}
            onChange={handleSearch}
          />
          <div className="bg-orange-600 h-[2.60rem] w-12 rounded-tr-full rounded-br-full flex items-center justify-center -ml-1 py-5">
            <HiSearch size={25} color="white" />
          </div>
        </div>
        <div className="flex justify-center items-center gap-8">
          {user?._id && (
            <Link
              to={"/cart"}
              className="flex items-center justify-center relative"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "smooth",
                })
              }
            >
              <span>
                <FaShoppingCart size={35} />
              </span>
              <span className="w-8 h-8 text-sm text-white rounded-full bg-orange-600 p-2 flex items-center justify-center absolute -top-5 -right-5">
                {cartLength}
              </span>
            </Link>
          )}
          <div className="relative flex justify-center cursor-pointer">
            {user && (
              <div
                onClick={() => setShowAdminPanel(!showAdminPanel)}
                className="flex items-center gap-2"
              >
                {user?.image ? (
                  <img
                    className="w-12 h-12 rounded-full border border-purple-700 p-2"
                    src={user?.image}
                    alt={user?.name}
                  />
                ) : (
                  <FaRegUserCircle size={35} />
                )}
                {user && (
                  <div className="font-semibold text-md hidden md:block">
                    Welcome, Mr. {user?.name}
                  </div>
                )}
              </div>
            )}
            {showAdminPanel && user?.role === ROLE.ADMIN && (
              <div className="absolute top-14 right-32 bg-gray-600 text-white p-2 rounded-md shadow-md">
                <nav className="flex flex-col gap-2">
                  <Link
                    className="whitespace-nowrap"
                    to={"/admin-panel/products"}
                    onClick={() => setShowAdminPanel(!showAdminPanel)}
                  >
                    Admin Panel
                  </Link>
                  <Link
                    className="whitespace-nowrap"
                    to={`/track/order/${user?.email}`}
                    onClick={() => setShowAdminPanel(!showAdminPanel)}
                  >
                    My Orders
                  </Link>
                </nav>
              </div>
            )}
            {showAdminPanel && user?.role !== ROLE.ADMIN && (
              <div className="absolute top-14 right-32 bg-gray-600 text-white p-2 rounded-md shadow-md">
                <nav>
                  <Link
                    className="whitespace-nowrap"
                    to={`/track/order/${user?.email}`}
                    onClick={() => setShowAdminPanel(!showAdminPanel)}
                  >
                    My Orders
                  </Link>
                </nav>
              </div>
            )}
          </div>
          <div>
            {user?._id ? (
              <Button
                buttonAction={handleLogout}
                value={"Logout"}
                bg={"bg-orange-600"}
                hoverBg={"bg-orange-700"}
              />
            ) : (
              <Link to={"/login"}>
                <Button
                  value={"Login"}
                  bg={"bg-orange-600"}
                  hoverBg={"bg-orange-700"}
                />
              </Link>
            )}
          </div>
          <div
            onClick={(e) => {
              e.preventDefault();
              setDarkMode(!darkMode);
            }}
            className="cursor-pointer"
          >
            {darkMode ? (
              <HiSun size={30} color="#ea5a0c" />
            ) : (
              <HiMoon size={30} color="#ea5a0c" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
