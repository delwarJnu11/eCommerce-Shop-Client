import { useState } from "react";
import { toast } from "react-toastify";
import { actions } from "../../actions";
import { ROLE } from "../../constants";
import useAxios from "../../hooks/useAxios";
import { useTheme } from "../../hooks/useTheme";
import { useUser } from "../../hooks/useUser";
import Button from "../shared/Button";

const UserUpdateModal = ({ user, onClose }) => {
  const { dispatch } = useUser();
  const [userRole, setUserRole] = useState(user?.role);
  const { darkMode } = useTheme();
  const { api } = useAxios();

  //handle update user role
  const handleUpdateRole = async () => {
    dispatch({ type: actions.user.USER_DATA_FETCHING });
    try {
      const response = await api.put(
        `user/${user._id}/update-role`,
        { newRole: userRole },
        { withCredentials: true }
      );
      if (response.status === 200) {
        dispatch({
          type: actions.user.ALL_USER_DATA_FETCHED,
          data: response.data.users,
        });
        if (response.data.success) {
          onClose();
          toast.success(response.data.message);
        }
      }

      if (response.data.error) {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch({
        type: actions.user.USER_DATA_FETCHING_ERROR,
        error: error.message,
      });
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
      <div
        className={`${
          darkMode ? "bg-[#1a202c] text-white" : "bg-white"
        } rounded-lg p-8 w-1/3 mx-auto`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Update User Role</h2>
          <button
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-white focus:outline-none"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="mt-4">
          <h2 className="text-md font-semibold my-2">Name: {user?.name}</h2>
          <p className="text-md mb-2">Email: {user?.email}</p>
          <label htmlFor="selectOption" className="block text-md font-medium">
            Update User Role:
          </label>
          <select
            id="selectOption"
            name="selectOption"
            required
            className={`auth-input ${
              darkMode && "bg-gray-700 text-white"
            } block w-full  rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:outline-none`}
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
          >
            <option
              className={darkMode && "text-white"}
              value="Select Role"
              disabled
            >
              Select Role
            </option>
            {Object.values(ROLE)?.map((role) => (
              <option
                className={darkMode && "text-white"}
                value={role}
                key={role}
              >
                {role}
              </option>
            ))}
          </select>
          <div className="mt-4">
            <Button
              value={"Update Role"}
              buttonAction={handleUpdateRole}
              bg={"bg-green-600"}
              hoverBg={"bg-green-800"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserUpdateModal;
