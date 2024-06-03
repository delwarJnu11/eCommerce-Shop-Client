import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const TopDiscountProducts = () => {
  return (
    <Link to="/products/top-discount">
      <div className="relative mt-16 flex flex-col justify-center items-center w-full h-[60vh] rounded-lg overflow-hidden">
        <div
          style={{
            background: "url('https://i.ibb.co/7CzQqSX/discount-Banner.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="absolute inset-0 w-full h-full"
        ></div>
        <div className="absolute inset-0 w-full h-full bg-black opacity-40"></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ease: "easeOut", duration: 1.5 }}
          className="relative text-center text-white z-10"
        >
          <p className="text-base font-medium tracking-widest py-2">
            EXCLUSIVE PRODUCTS
          </p>
          <h2 className="text-[36px] font-extrabold leading-[54px] uppercase tracking-wide my-2">
            Top Discount on
            <br /> All Products
          </h2>

          <button className="py-2 md:py-3 px-6 md:px-8 bg-[#FF6500] text-white text-xs md:text-sm font-medium tracking-[2px] uppercase hover:scale-105 hover:transition-all hover:bg-[#C40C0C] rounded-md mt-4">
            SHOP NOW
          </button>
        </motion.div>
      </div>
    </Link>
  );
};
export default TopDiscountProducts;
