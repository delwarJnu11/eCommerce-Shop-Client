import { useContext } from "react";
import { UserContext } from "../contexts";

export const useUser = () => {
  return useContext(UserContext);
};
