import { useEffect, useState } from "react";
import { actions } from "../../actions";
import { api } from "../../api";
import ProductCard from "../../components/product/ProductCard";
import ProductUploadModal from "../../components/product/ProductUploadModal";
import Button from "../../components/shared/Button";
import { useProduct } from "../../hooks/useProduct";

const AllProducts = () => {
  const [openModal, setOpenModal] = useState(false);
  const { state, dispatch } = useProduct();

  //get all product
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
          error: error.message,
        });
      }
    };
    fetchAllProducts();
  }, [dispatch]);
  // console.log(state);
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">
          {state?.products.length
            ? "All Products"
            : "No product available. please add some product."}
        </h2>
        <Button
          value="Upload Product"
          buttonAction={() => setOpenModal(true)}
          bg="bg-green-600"
          hoverBg="bg-green-800"
        />
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-h-[445px] overflow-y-scroll">
        {state?.products &&
          state.products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
      {openModal && <ProductUploadModal onClose={() => setOpenModal(false)} />}
    </>
  );
};
export default AllProducts;
