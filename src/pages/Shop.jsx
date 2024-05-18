import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { actions } from "../actions";
import { api } from "../api";
import ProductCardLoader from "../components/loader/ProductCardLoader";
import CategorizedProductCard from "../components/product/CategorizedProductCard";
import { productCategory } from "../constants";
import useFetchCartProducts from "../hooks/useFetchCartProducts";
import { useProduct } from "../hooks/useProduct";
import { useTheme } from "../hooks/useTheme";

const Shop = () => {
  const { darkMode } = useTheme();
  const { state, dispatch } = useProduct();
  const [categoryList, setCategoryList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { fetchCartProducts } = useFetchCartProducts();

  //get all products
  useEffect(() => {
    dispatch({ type: actions.product.PRODUCT_DATA_FETCHING });
    const fetchAllProducts = async () => {
      try {
        const response = await api.get("/products", { withCredentials: true });
        if (response?.data?.success) {
          dispatch({
            type: actions.product.ALL_PRODUCTS_DATA_FETCHED,
            data: response.data.products,
          });
        }
      } catch (error) {
        dispatch({
          type: actions.product.PRODUCT_DATA_FETCHING_ERROR,
          error: error.response.data.message,
        });
      }
    };
    fetchAllProducts();
  }, [dispatch]);

  useEffect(() => {
    setLoading(true);
    const fetchAllProducts = async () => {
      try {
        const response = await api.post("/filter-products", {
          category: categoryList,
        });
        if (response?.data?.success) {
          setFilteredProducts(response.data.data);
        }
      } catch (error) {
        setError(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, [categoryList]);

  //handle checkbox
  const handleCheckboxChange = (categoryValue, isChecked) => {
    if (isChecked) {
      setCategoryList([...categoryList, categoryValue]);
    } else {
      setCategoryList(categoryList.filter((value) => value !== categoryValue));
    }
  };
  // decide what to render
  const products =
    categoryList.length === 0 ? state?.products : filteredProducts;

  // handle product details
  const handleProductDetails = (e, id) => {
    //find product category Name
    const product = products.find((pd) => {
      if (pd._id === id) {
        return pd.categoryName;
      }
    });
    if (!e.target.closest("button")) {
      navigate(`/products/${product?.categoryName}/${id}`);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  // handle Add to Cart
  const handleAddToCart = async (productId) => {
    try {
      const response = await api.post(
        "/product/add-to-cart",
        { productId },
        { withCredentials: true }
      );
      if (response.data.success) {
        fetchCartProducts();
        toast.success(response.data.message);
      }

      if (response.data.error) {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      navigate("/login");
    }
  };

  //create loading state array
  const loadingList = new Array(products?.length).fill(null);

  if (state?.error || error) {
    return (
      <div className="flex text-red-400 w-full h-[100vh-300px] justify-center items-center">
        <p>{state?.error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="flex gap-4 py-6">
        <div
          className={`${
            darkMode
              ? "dark"
              : "md:w-1/6 bg-white rounded p-3 max-h-[90vh] overflow-y-scroll"
          }`}
        >
          <h2
            className={`${
              darkMode ? "text-white" : "text-slate-600"
            } uppercase border-b border-slate-300 pb-1 px-2 pt-2 font-semibold text-base`}
          >
            Filter by category
          </h2>
          {productCategory.map((category) => (
            <div
              key={category.id}
              className="flex items-center gap-2 px-3 mt-1"
            >
              <input
                type="checkbox"
                name={category.value}
                id={category.value}
                value={category.value}
                onChange={(e) =>
                  handleCheckboxChange(category.value, e.target.checked)
                }
              />
              <label
                htmlFor={category.value}
                className={`${
                  darkMode ? "dark" : "text-gray-500 font-medium text-sm"
                }`}
              >
                {category.label}
              </label>
            </div>
          ))}
        </div>

        <div
          className={`${
            darkMode ? "dark" : "bg-white"
          } md:w-5/6 max-h-[90vh] overflow-y-scroll pt-2`}
        >
          <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {state.loading === true || loading === true
              ? loadingList?.map((el, index) => (
                  <ProductCardLoader key={index} />
                ))
              : products?.map((product) => (
                  <CategorizedProductCard
                    key={product._id}
                    product={product}
                    productDetails={handleProductDetails}
                    onAddCart={handleAddToCart}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Shop;
