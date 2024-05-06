import { useState } from "react";
import { toast } from "react-toastify";
import { actions } from "../../actions";
import { api } from "../../api";
import { ROLE } from "../../constants";
import { useUser } from "../../hooks/useUser";
import Button from "../shared/Button";

const UserUpdateModal = ({ user, onClose }) => {
  const { dispatch } = useUser();
  const [userRole, setUserRole] = useState(user?.role);

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
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 w-1/3 mx-auto">
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
            className="block w-full mt-1 mb-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:outline-none"
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
          >
            <option value="Select Role" disabled>
              Select Role
            </option>
            {Object.values(ROLE)?.map((role) => (
              <option value={role} key={role}>
                {role}
              </option>
            ))}
          </select>
          <Button
            value={"Update Role"}
            buttonAction={handleUpdateRole}
            bg={"bg-green-600"}
            hoverBg={"bg-green-800"}
          />
        </div>
      </div>
    </div>
  );
};

export default UserUpdateModal;
