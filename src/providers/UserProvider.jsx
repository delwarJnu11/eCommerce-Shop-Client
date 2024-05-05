import { useReducer } from "react";
import { UserContext } from "../contexts";
import {
  initailState,
  userDetailsReducer,
} from "../reducers/userDetailsReducer";

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userDetailsReducer, initailState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
