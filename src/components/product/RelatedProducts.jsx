import { useEffect } from "react";
import { toast } from "react-toastify";
import { actions } from "../../actions";
import { api } from "../../api";
import { useProduct } from "../../hooks/useProduct";
import ProductCardLoader from "../loader/ProductCardLoader";
import ProductCardVertical from "./homeProductCard/ProductCardVertical";

const RelatedProducts = ({ productId, productCategory, heading }) => {
  const { state, dispatch } = useProduct();
  const loadingList = new Array(4).fill(null);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      dispatch({ type: actions.product.PRODUCT_DATA_FETCHING });
      try {
        const response = await api.get(`/products/category/${productCategory}`);
        if (response?.data?.error) {
          toast.error(response?.data?.message);
        }
        if (response?.data?.success) {
          dispatch({
            type: actions.product.PRODUCTS_BY_CATEGORY_DATA_FETCHED,
            data: response?.data?.products,
            category: productCategory,
          });
        }
      } catch (error) {
        dispatch({
          type: actions.product.PRODUCT_DATA_FETCHING_ERROR,
          error: error.message,
        });
      }
    };
    fetchProductsByCategory();
  }, [dispatch, productCategory]);

  return (
    <div className="my-6">
      <h2 className="text-md md:text-[22px] font-semibold block my-4">
        {heading}
      </h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {state?.loading
          ? loadingList.map((el, index) => <ProductCardLoader key={index} />)
          : state?.productsByCategory[productCategory]
              ?.filter((product) => product._id !== productId)
              ?.map((product) => (
                <ProductCardVertical key={product._id} product={product} />
              ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
