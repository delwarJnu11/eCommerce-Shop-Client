import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { actions } from "../actions";
import { api } from "../api";
import CategorizedProductCard from "../components/product/CategorizedProductCard";
import { useProduct } from "../hooks/useProduct";

const CategoriesProducts = () => {
  const [sortValue, setSortValue] = useState("");
  const params = useParams();
  const { state, dispatch } = useProduct();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      dispatch({ type: actions.product.PRODUCT_DATA_FETCHING });
      try {
        const response = await api.get(
          `/products/category/${params.categoryName}`
        );
        if (response?.data?.error) {
          toast.error(response?.data?.message);
        }
        if (response?.data?.success) {
          dispatch({
            type: actions.product.PRODUCTS_BY_CATEGORY_DATA_FETCHED,
            data: response?.data?.products,
            category: params.categoryName,
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
  }, [dispatch, params.categoryName]);

  useEffect(() => {
    const fetchCartData = async () => {
      dispatch({ type: actions.cart.CART_DATA_FETCHING });
      try {
        const response = await api.get("/cart-products", {
          withCredentials: true,
        });
        if (response.data.success) {
          dispatch({
            type: actions.cart.CART_DATA_FETCHED,
            data: response.data.cart,
          });
        }
        if (response.data.error) {
          toast.error(response.data.message);
        }
      } catch (error) {
        dispatch({
          type: actions.cart.CART_DATA_FETCHING_ERROR,
          error: error.response.data.message,
        });
      }
    };
    fetchCartData();
  }, [dispatch]);

  const handleProductDetails = (e, id) => {
    if (!e.target.closest("button")) {
      navigate(`/products/${params.categoryName}/${id}`);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };

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
        <p className="text-slate-600 text-md font-semibold  uppercase">
          all {params.categoryName}s
        </p>
        <select
          name="sort"
          id="sort"
          className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none"
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
            category === params.categoryName &&
            sortProductsByPrice(
              state?.productsByCategory[params.categoryName],
              sortValue
            )?.map((product) => (
              <CategorizedProductCard
                key={product._id}
                product={product}
                productDetails={handleProductDetails}
              />
            ))
        )}
      </div>
    </div>
  );
};
export default CategoriesProducts;

// Object.keys(state.productsByCategory).map(
//           (category) =>
//             category === params.categoryName &&
//             sortProductsByPrice(state?.productsByCategory[params.categoryName], sortValue)
