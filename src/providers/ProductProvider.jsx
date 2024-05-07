import { useReducer } from "react";
import { ProductContext } from "../contexts";
import { initialState, productReducer } from "../reducers/productReducer";

const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};
export default ProductProvider;
