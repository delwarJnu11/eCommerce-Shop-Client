import { useEffect } from "react";
import { actions } from "../actions";
import { api } from "../api";
import ProductCardVertical from "../components/product/homeProductCard/ProductCardVertical";
import Heading from "../components/shared/Heading";
import { useProduct } from "../hooks/useProduct";
import { getTopDiscountProducts } from "../utils/getTopDiscountProducts";

const TopDiscountProductsPage = () => {
  const { state, dispatch } = useProduct();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products", {
          withCredentials: true,
        });
        if (response?.data?.success) {
          dispatch({
            type: actions.product.ALL_PRODUCTS_DATA_FETCHED,
            data: response.data.products,
          });
        }
      } catch (error) {
        dispatch({
          type: actions.product.PRODUCT_DATA_FETCHING_ERROR,
          error: error.message,
        });
      }
    };
    fetchProducts();
  }, [dispatch]);

  const disCountProducts = getTopDiscountProducts(state?.products, 12);
  return (
    <div className="container mx-auto">
      <Heading value="TOP DISCOUNT PRODUCTS" />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {disCountProducts?.map((product) => (
          <ProductCardVertical key={product?._id} product={product} />
        ))}
      </div>
    </div>
  );
};
export default TopDiscountProductsPage;
