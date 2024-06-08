import { useEffect } from "react";
import {
  FaBoxOpen,
  FaShoppingCart,
  FaSignOutAlt,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { ROLE } from "../constants";
import { useTheme } from "../hooks/useTheme";
import { useUser } from "../hooks/useUser";

const AdminPanel = () => {
  const { state } = useUser();
  const navigate = useNavigate();
  const user = state?.data?.data;
  const { darkMode } = useTheme();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user?.role, navigate]);

  return (
    <div
      className={`${
        darkMode ? "dark" : ""
      } min-h-[calc(100vh-120px)] py-4 md:flex hidden gap-4`}
    >
      <aside
        className={`${
          darkMode ? "dark" : "bg-white"
        } min-h-full  w-full max-w-60 shadow-sm`}
      >
        <div className="h-32  flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer relative flex justify-center mb-4">
            {user?.image !== null ? (
              <img
                src={user?.image}
                className="w-20 h-20 rounded-full"
                alt={user?.name}
              />
            ) : (
              <FaUser size={65} />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p className="text-sm">{user?.role}</p>
        </div>

        {/***navigation */}
        <div>
          <nav className={`grid p-4 gap-4 h-full ${darkMode && "text-white"}`}>
            <NavLink
              to="users"
              className="flex items-center px-4 py-2 rounded-lg hover:bg-[#FF6500] hover:text-white"
              activeClassName="bg-gray-700"
            >
              <FaUsers className="mr-3" size={20} />
              <span>Users</span>
            </NavLink>
            <NavLink
              to="products"
              className="flex items-center px-4 py-2 rounded-lg hover:bg-[#FF6500] hover:text-white"
              activeClassName="bg-gray-700"
            >
              <FaBoxOpen className="mr-3" size={20} />
              <span>Products</span>
            </NavLink>
            <NavLink
              to="orders"
              className="flex items-center px-4 py-2 rounded-lg hover:bg-[#FF6500] hover:text-white"
              activeClassName="bg-gray-700"
            >
              <FaShoppingCart className="mr-3" size={20} />
              <span>Orders</span>
            </NavLink>
            <NavLink
              to="logout"
              className="flex items-center px-4 py-2 rounded-lg hover:bg-[#FF6500] hover:text-white"
              activeClassName="bg-gray-700"
            >
              <FaSignOutAlt className="mr-3" size={20} />
              <span>Logout</span>
            </NavLink>
          </nav>
        </div>
      </aside>

      <main
        className={`${darkMode ? "dark" : "bg-gray-100"} container mx-auto`}
      >
        <Outlet />
      </main>
    </div>
  );
};
export default AdminPanel;
