import { useEffect, useState } from "react";
import { FaRegUserCircle, FaShoppingCart } from "react-icons/fa";
import { HiSearch } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { actions } from "../../actions";
import { api } from "../../api";
import { ROLE } from "../../constants";
import { useUser } from "../../hooks/useUser";
import Button from "./Button";

const Header = () => {
  const { state, dispatch } = useUser();
  const navigate = useNavigate();
  const [showAdminPanel, setShowAdminPanel] = useState(false);
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
                      to={"/admin-panel"}
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
        </div>
      </div>
    </header>
  );
};
export default Header;
