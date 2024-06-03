import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useProduct } from "../../hooks/useProduct";
import { getTopDiscountProducts } from "../../utils/getTopDiscountProducts";
import ProductCardVertical from "../product/homeProductCard/ProductCardVertical";
import Heading from "../shared/Heading";

const TopDeal = () => {
  const { state } = useProduct();
  // give products and number it return number of top discount product
  const discountProducts = getTopDiscountProducts(state?.products, 2);

  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  if (state?.error) {
    return <p>{state?.error}</p>;
  }

  return (
    <div>
      <Heading value="Deal Of The Week" />
      <motion.div
        className="grid sm:grid-cols-1 md:grid-cols-3 gap-4"
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, x: -100 },
          visible: { opacity: 1, x: 0 },
        }}
        transition={{ duration: 1 }}
      >
        <ProductCardVertical product={discountProducts[0]} />

        <div
          className="h-[300px] md:h-full relative"
          style={{
            background: "url('https://i.ibb.co/RyhL2Z9/banner-deals.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "20px",
            color: "#d3d3d3",
          }}
        >
          <div className="absolute inset-0 w-full h-full bg-black opacity-20 rounded-[20px]"></div>
          <div className="flex flex-col justify-center items-center h-full p-6">
            <p className="text-base font-medium text-[#FF8A08] tracking-[1.3px]">
              BEST DEALS OF THIS WEEK
            </p>
            <h1 className="text-white text-[50px] tracking-[2px] font-extrabold">
              50% OFF
            </h1>
            <p className="text-[15px] font-medium leading-[24px] tracking-[1px] text-center">
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
      </motion.div>
    </div>
  );
};
export default TopDeal;
