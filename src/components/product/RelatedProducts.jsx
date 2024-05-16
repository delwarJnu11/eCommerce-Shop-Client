import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { actions } from "../../actions";
import { api } from "../../api";
import { useProduct } from "../../hooks/useProduct";
import ProductCardLoader from "../loader/ProductCardLoader";
import CategorizedProductCard from "../product/CategorizedProductCard";
import useFetchCartProducts from "../../hooks/useFetchCartProducts";

const RelatedProducts = ({ productId, productCategory, heading }) => {
  const { state, dispatch } = useProduct();
  const navigate = useNavigate();
  const { fetchCartProducts } = useFetchCartProducts();
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

  const handleProductDetails = (e, id) => {
    if (!e.target.closest("button")) {
      navigate(`/products/${productCategory}/${id}`);
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

  return (
    <div className="my-6">
      <h2 className="text-md md:text-[22px] text-gray-700 font-semibold block my-4">
        {heading}
      </h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {state?.loading
          ? loadingList.map((el, index) => <ProductCardLoader key={index} />)
          : Object.keys(state.productsByCategory).map(
              (category) =>
                category === productCategory &&
                state?.productsByCategory[productCategory]
                  ?.filter((product) => product._id !== productId)
                  ?.map((product) => (
                    <CategorizedProductCard
                      key={product._id}
                      product={product}
                      productDetails={handleProductDetails}
                      onAddCart={handleAddToCart}
                    />
                  ))
            )}
      </div>
    </div>
  );
};

export default RelatedProducts;
