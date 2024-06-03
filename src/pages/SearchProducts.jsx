import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { actions } from "../actions";
import ProductCardLoader from "../components/loader/ProductCardLoader";
import ProductCardVertical from "../components/product/homeProductCard/ProductCardVertical";
import useAxios from "../hooks/useAxios";
import { useProduct } from "../hooks/useProduct";

const SearchProducts = () => {
  const query = useLocation();
  const { api } = useAxios();
  const { state, dispatch } = useProduct();

  useEffect(() => {
    const fetchSearchProducts = async () => {
      dispatch({ type: actions.product.PRODUCT_DATA_FETCHING });
      try {
        const response = await api.get(`/search${query.search}`, {
          withCredentials: true,
        });
        if (response.data.success) {
          dispatch({
            type: actions.product.SEARCH_PRODUCTS_DATA_FETCHED,
            data: response.data.products,
          });
        }
        if (response.data.error) {
          dispatch({
            type: actions.product.PRODUCT_DATA_FETCHING_ERROR,
            error: response.data.message,
          });
        }
      } catch (error) {
        dispatch({
          type: actions.product.PRODUCT_DATA_FETCHING_ERROR,
          error: error.response.data.message,
        });
      }
    };
    fetchSearchProducts();
  }, [query.search, dispatch, api]);

  const loadingState = new Array(state.searchProducts.length).fill(null);
  return (
    <div className="container mx-auto py-6">
      <h2 className="text-md md:text-lg lg:text-2xl p-2 font-semibold mb-4">
        search results found:{" "}
        <span className="text-bold text-orange-600">
          {state.searchProducts.length}
        </span>
      </h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {state?.loading === true
          ? loadingState.map((el, index) => <ProductCardLoader key={index} />)
          : state?.searchProducts &&
            state?.searchProducts?.map((product) => (
              <ProductCardVertical key={product?._id} product={product} />
            ))}
      </div>
    </div>
  );
};
export default SearchProducts;
