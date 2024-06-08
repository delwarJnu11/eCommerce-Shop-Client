import { useEffect, useState } from "react";
import { actions } from "../../actions";
import ProductCard from "../../components/product/ProductCard";
import ProductUploadModal from "../../components/product/ProductUploadModal";
import Button from "../../components/shared/Button";
import useAxios from "../../hooks/useAxios";
import { useProduct } from "../../hooks/useProduct";

const AllProducts = () => {
  const [openModal, setOpenModal] = useState(false);
  const { state, dispatch } = useProduct();
  const { api } = useAxios();

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
  }, [dispatch, api]);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="mt-4 capitalize border-b font-bold text-3xl tracking-wider">
          {state?.products.length
            ? "All Products"
            : "No product available. please add some product."}
        </h2>
        <Button
          value="Upload Product"
          buttonAction={() => setOpenModal(true)}
          bg="bg-[#FF6500]"
          hoverBg="bg-[#C40C0C]"
        />
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 max-h-[445px] overflow-y-scroll scrollbar-hide">
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
