import moment from "moment";
import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { actions } from "../../actions";
import { api } from "../../api";
import UserUpdateModal from "../../components/user/UserUpdateModal";
import { useTheme } from "../../hooks/useTheme";
import { useUser } from "../../hooks/useUser";

const AllUsers = () => {
  const { state, dispatch } = useUser();
  const [userToUpdate, setUserToUpdate] = useState({
    _id: "",
    name: "",
    email: "",
    role: "",
  });
  const [showModal, setShowModal] = useState(false);
  const { darkMode } = useTheme();

  //fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      dispatch({ type: actions.user.USER_DATA_FETCHING });
      try {
        const response = await api.get("/users", {
          withCredentials: true,
        });
        if (response.status === 200) {
          dispatch({
            type: actions.user.ALL_USER_DATA_FETCHED,
            data: response.data.users,
          });
        }
      } catch (error) {
        dispatch({
          type: actions.user.USER_DATA_FETCHING_ERROR,
          error: error.message,
        });
      }
    };
    fetchUsers();
  }, [dispatch]);

  //handle User Modal
  const handleUserModal = (user) => {
    setUserToUpdate(user);
    setShowModal(true);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className={darkMode ? "dark" : "bg-gray-50 text-gray-900"}>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
              SL.
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
              Join
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody
          className={`${
            darkMode ? "dark" : "bg-white"
          } divide-y divide-gray-300`}
        >
          {state?.users &&
            state.users.map((user, index) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {moment(user.createdAt).format("ll")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div
                    className="bg-green-600 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
                    title="Edit"
                    onClick={() => handleUserModal(user)}
                  >
                    <MdEdit color="white" size={20} />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {showModal && (
        <UserUpdateModal
          user={userToUpdate}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};
export default AllUsers;
