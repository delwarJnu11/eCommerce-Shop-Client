import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { actions } from "../actions";
import ProductCardVertical from "../components/product/homeProductCard/ProductCardVertical";
import Heading from "../components/shared/Heading";
import useAxios from "../hooks/useAxios";
import useFetchCartProducts from "../hooks/useFetchCartProducts";
import { useProduct } from "../hooks/useProduct";
import { useTheme } from "../hooks/useTheme";

const CategoriesProducts = () => {
  const [sortValue, setSortValue] = useState("");
  const { categoryName } = useParams();
  const { state, dispatch } = useProduct();
  const { darkMode } = useTheme();
  const { fetchCartProducts } = useFetchCartProducts();
  const { api } = useAxios();

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      dispatch({ type: actions.product.PRODUCT_DATA_FETCHING });
      try {
        const response = await api.get(`/products/category/${categoryName}`);
        if (response?.data?.error) {
          toast.error(response?.data?.message);
        }
        if (response?.data?.success) {
          dispatch({
            type: actions.product.PRODUCTS_BY_CATEGORY_DATA_FETCHED,
            data: response?.data?.products,
            category: categoryName,
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
  }, [dispatch, categoryName, api]);

  useEffect(() => {
    fetchCartProducts();
  }, [fetchCartProducts]);

  // Function to sort products by price
  const sortProductsByPrice = (products, sortOrder) => {
    return products.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.sellingPrice - b.sellingPrice;
      } else if (sortOrder === "desc") {
        return b.sellingPrice - a.sellingPrice;
      }
    });
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center px-2 mb-4">
        <Heading value={categoryName} />
        <select
          name="sort"
          id="sort"
          className={`${
            darkMode ? "dark" : "bg-white"
          } px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none`}
          value={sortValue}
          onChange={(e) => setSortValue(e.target.value)}
        >
          <option className="text-base font-normal" value="">
            Sort by Price
          </option>
          <option className="text-base font-normal" value="asc">
            Low to High
          </option>
          <option className="text-base font-normal" value="desc">
            High to Low
          </option>
        </select>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Object.keys(state.productsByCategory).map(
          (category) =>
            category === categoryName &&
            sortProductsByPrice(
              state?.productsByCategory[categoryName],
              sortValue
            )?.map((product) => (
              <ProductCardVertical key={product?._id} product={product} />
            ))
        )}
      </div>
    </div>
  );
};
export default CategoriesProducts;
