import { useEffect, useState } from "react";
import { FaMoon, FaRegUserCircle, FaShoppingCart, FaSun } from "react-icons/fa";
import { HiSearch } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { actions } from "../../actions";
import { api } from "../../api";
import Logo from "../../assets/logo.jpg";
import { ROLE } from "../../constants";
import { useCart } from "../../hooks/useCart";
import useFetchCartProducts from "../../hooks/useFetchCartProducts";
import { useTheme } from "../../hooks/useTheme";
import { useUser } from "../../hooks/useUser";
import Button from "./Button";

const Header = () => {
  const { state, dispatch } = useUser();
  const { state: cartState } = useCart();
  const navigate = useNavigate();
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);
  const [cartLength, setCartLength] = useState(cartState?.cart.length);
  const { fetchCartProducts } = useFetchCartProducts();
  //dark mode
  const { darkMode, setDarkMode } = useTheme();

  // Update cart length when cart state changes
  useEffect(() => {
    fetchCartProducts();
    setCartLength(cartState?.cart.length);
  }, [cartState?.cart.length]);

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
        <Link
          to={"/"}
          className="w-20 h-20 md:w-20 md:h-20 rounded-full overflow-hidden flex items-center justify-center"
        >
          <img
            src={Logo}
            alt=""
            className="h-full object-scale-down mix-blend-multiply"
          />
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
          <div className="relative flex justify-center">
            {user && (
              <div onClick={() => setShowAdminPanel(!showAdminPanel)}>
                {user?.image ? (
                  <img
                    className="w-12 h-12 rounded-full"
                    src={user?.image}
                    alt={user?.name}
                  />
                ) : (
                  <FaRegUserCircle size={35} />
                )}
              </div>
            )}
            {showAdminPanel && (
              <div className="absolute top-14 bg-slate-100 p-2 rounded-md shadow-md">
                {user?.role === ROLE.ADMIN && (
                  <nav>
                    <Link
                      className="whitespace-nowrap"
                      to={"/admin-panel/products"}
                      onClick={() => setShowAdminPanel(!showAdminPanel)}
                    >
                      Admin Panel
                    </Link>
                  </nav>
                )}
              </div>
            )}
          </div>
          <div>
            {user?._id ? (
              <Button
                buttonAction={handleLogout}
                value={"Logout"}
                bg={"bg-red-500"}
                hoverBg={"bg-red-700"}
              />
            ) : (
              <Link to={"/login"}>
                <Button
                  value={"Login"}
                  bg={"bg-red-500"}
                  hoverBg={"ng-red-700"}
                />
              </Link>
            )}
          </div>
          <div
            onClick={(e) => {
              e.preventDefault();
              setDarkMode(!darkMode);
            }}
          >
            {darkMode ? <FaSun color="red" /> : <FaMoon color="red" />}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
