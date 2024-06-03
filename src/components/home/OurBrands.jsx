import { motion } from "framer-motion";
import Heading from "../shared/Heading";

const OurBrands = () => {
  const brands = [
    {
      name: "Panasonic",
      src: "https://demothemesky-be87.kxcdn.com/ecomall/wp-content/uploads/2023/12/panasonic.png",
    },
    {
      name: "Sony",
      src: "https://demothemesky-be87.kxcdn.com/ecomall/wp-content/uploads/2023/11/sony-1.png",
    },
    {
      name: "Asus",
      src: "https://demothemesky-be87.kxcdn.com/ecomall/wp-content/uploads/2023/12/asus.png",
    },
    {
      name: "Samsung",
      src: "https://demothemesky-be87.kxcdn.com/ecomall/wp-content/uploads/2023/12/samsung.png",
    },
    {
      name: "Sanyo",
      src: "https://demothemesky-be87.kxcdn.com/ecomall/wp-content/uploads/2023/11/sanyo-1.png",
    },
    {
      name: "Oppo",
      src: "https://demothemesky-be87.kxcdn.com/ecomall/wp-content/uploads/2022/11/oppo.png",
    },
    {
      name: "Dell",
      src: "https://demothemesky-be87.kxcdn.com/ecomall/wp-content/uploads/2023/12/dell.png",
    },
    {
      name: "Lenovo",
      src: "https://demothemesky-be87.kxcdn.com/ecomall/wp-content/uploads/2023/12/lenovo.png",
    },
    {
      name: "Apple",
      src: "https://demothemesky-be87.kxcdn.com/ecomall/wp-content/uploads/2023/12/apple-2.png",
    },
    {
      name: "JBL",
      src: "https://demothemesky-be87.kxcdn.com/ecomall/wp-content/uploads/2023/12/jbl.png",
    },
    {
      name: "Canon",
      src: "https://demothemesky-be87.kxcdn.com/ecomall/wp-content/uploads/2023/12/canon.png",
    },
    {
      name: "Intel",
      src: "https://demothemesky-be87.kxcdn.com/ecomall/wp-content/uploads/2023/12/intel-1.png",
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ease: "easeOut", duration: 1.5 }}
    >
      <Heading value="Our Brands" />
      <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-6 p-4">
        {brands.map((brand, index) => (
          <div
            key={index}
            className="flex justify-center items-center border border-gray-200 p-4 opacity-20 cursor-pointer hover:opacity-100 hover:bg-white transition-all"
          >
            <img src={brand.src} alt={brand.name} className="max-h-12" />
          </div>
        ))}
      </div>
    </motion.div>
  );
};
export default OurBrands;
