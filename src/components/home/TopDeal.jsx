import { useProduct } from "../../hooks/useProduct";
import { getTopDiscountProducts } from "../../utils/getTopDiscountProducts";
import ProductCardVertical from "../product/homeProductCard/ProductCardVertical";
import Heading from "../shared/Heading";

const TopDeal = () => {
  const { state } = useProduct();
  // give products and number it return number of top discount product
  const discountProducts = getTopDiscountProducts(state?.products, 2);
  return (
    <div>
      <Heading value="Deal Of The Week" />
      <div className="flex justify-center gap-4">
        <ProductCardVertical product={discountProducts[0]} />
        <div
          style={{
            background: "url('https://i.ibb.co/RyhL2Z9/banner-deals.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            backgroundRepeat: "no-repeat",
            color: "white",
            borderRadius: "20px",
          }}
        >
          <div className="flex flex-col space-y-2 px-10 pt-10">
            <p className="text-base font-medium text-[#FF8A08] tracking-[1.3px]">
              BEST DEALS OF THIS WEEK
            </p>
            <h1 className="text-white text-[50px] tracking-[2px] font-extrabold">
              50% OFF
            </h1>
            <p className="text-[15px] font-medium leading-[24px] tracking-[1px]">
              Deal of the Week for deals on consumer electronics.
            </p>
            <div className="flex items-center gap-4 pt-8">
              <div className="bg-[#FF6500] text-white p-4 rounded-md text-sm font-medium">
                <span className="text-2xl text-center font-extrabold">15</span>
                <br />
                Hours
              </div>
              <div className="bg-[#FF6500] text-white p-4 rounded-md text-sm font-medium">
                <span className="text-2xl text-center font-extrabold">28</span>
                <br />
                Mins
              </div>
              <div className="bg-[#FF6500] text-white p-4 rounded-md text-sm font-medium">
                <span className="text-2xl text-center font-extrabold">37</span>
                <br />
                Secs
              </div>
            </div>
          </div>
        </div>
        <ProductCardVertical product={discountProducts[1]} />
      </div>
    </div>
  );
};
export default TopDeal;
