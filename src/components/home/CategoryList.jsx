import { useEffect } from "react";
import { Link } from "react-router-dom";
import { actions } from "../../actions";
import { api } from "../../api";
import { useProduct } from "../../hooks/useProduct";

const CategoryList = () => {
  const { state, dispatch } = useProduct();

  const categoryLoading = new Array(12).fill(null);

  useEffect(() => {
    const fetchCategories = async () => {
      dispatch({ type: actions.product.PRODUCT_DATA_FETCHING });
      try {
        const response = await api.get("/products/categories");
        if (response.data.success) {
          dispatch({
            type: actions.product.ALL_CATEGORIES_DATA_FETCHED,
            data: response.data.data,
          });
        }
      } catch (error) {
        dispatch({
          type: actions.product.PRODUCT_DATA_FETCHING_ERROR,
          error: error.message,
        });
      }
    };
    fetchCategories();
  }, [dispatch]);

  if (state?.error) {
    return <p>{state.error}</p>;
  }

  return (
    <div className="flex items-center gap-4 justify-between overflow-scroll scrollbar-none">
      {state?.loading === true
        ? categoryLoading.map((el, index) => (
            <div
              className="h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse blink-animation"
              key={index}
            ></div>
          ))
        : state?.categories &&
          state.categories.map((category) => (
            <Link
              to={`/products/category/${category?.categoryName}`}
              key={category._id}
              className="cursor-pointer"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center">
                <img
                  src={category.productImages[0]}
                  alt=""
                  className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                />
              </div>
              <h2 className="text-center sm:text-sm text-base capitalize">
                {category.categoryName}
              </h2>
            </Link>
          ))}
    </div>
  );
};
export default CategoryList;
