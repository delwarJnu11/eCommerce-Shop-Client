import { useProduct } from "../../hooks/useProduct";
import ProductCardVertical from "../product/homeProductCard/ProductCardVertical";
import Heading from "../shared/Heading";

const NewArrivals = () => {
  const { state } = useProduct();

  return (
    <div>
      <Heading value="New Arrivals" />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {state?.products &&
          state?.products
            ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            ?.slice(0, 4)
            ?.map((product) => (
              <div key={product._id}>
                <ProductCardVertical key={product._id} product={product} />
              </div>
            ))}
      </div>
    </div>
  );
};
export default NewArrivals;
