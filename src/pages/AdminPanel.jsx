import { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { ROLE } from "../constants";
import { useUser } from "../hooks/useUser";

const AdminPanel = () => {
  const { state } = useUser();
  const navigate = useNavigate();
  const user = state?.data?.data;

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user?.role, navigate]);

  return (
    <div className="min-h-[calc(100vh-120px)] pt-2 md:flex hidden">
      <aside className="bg-white min-h-full  w-full  max-w-60 border-r-2 shadow-sm">
        <div className="h-32  flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer relative flex justify-center">
            <img
              src={user?.image}
              className="w-20 h-20 rounded-full"
              alt={user?.name}
            />
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p className="text-sm">{user?.role}</p>
        </div>

        {/***navigation */}
        <div>
          <nav className="grid p-4">
            <NavLink to={"users"} className="px-2 py-1 hover:bg-slate-100">
              All Users
            </NavLink>
            <NavLink to={"products"} className="px-2 py-1 hover:bg-slate-100">
              All products
            </NavLink>
          </nav>
        </div>
      </aside>

      <main className="container mx-auto bg-gray-100 p-4">
        <Outlet />
      </main>
    </div>
  );
};
export default AdminPanel;
