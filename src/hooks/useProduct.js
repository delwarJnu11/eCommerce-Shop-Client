import { useContext } from "react";
import { ProductContext } from "../contexts";

export const useProduct = () => {
  return useContext(ProductContext);
};
