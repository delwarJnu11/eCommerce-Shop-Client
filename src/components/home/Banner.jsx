import { useEffect, useRef } from "react";
import SwiperCore from "swiper/core";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { useTheme } from "../../hooks/useTheme";
import CategoryMenu from "./CategoryMenu";
SwiperCore.use([Pagination, Navigation, Autoplay]);

const Banner = () => {
  const swiperRef = useRef(null);
  const { darkMode } = useTheme();

  useEffect(() => {
    const swiper = swiperRef?.current?.swiper;

    if (swiper) {
      swiper?.autoplay?.start();
    }

    return () => {
      if (swiper) {
        swiper?.autoplay?.stop();
      }
    };
  }, []);
  return (
    <div className="flex flex-col md:flex-row">
      {/* Category Menu */}
      <CategoryMenu />

      <div className="w-full md:w-5/6">
        <Swiper
          ref={swiperRef}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
          speed={2000}
          effect="fade"
          className="mySwiper"
        >
          <SwiperSlide className="relative">
            <div
              className={`${
                darkMode ? "dark" : "bg-slate-300"
              } absolute inset-0 bg-opacity-50 z-0`}
            ></div>
            <div className="relative flex flex-col md:flex-row justify-center items-center gap-5 z-10">
              <div className="text-center md:text-left pl-6">
                <button className="text-[12px] font-[600] leading-[15px] bg-[#C40C0C] text-white uppercase px-5 py-2 rounded-tr-lg rounded-br-lg rounded-bl-lg mb-4">
                  Flash Sale
                </button>
                <h2
                  className={`${
                    darkMode ? "text-white" : "text-[#414141]"
                  } text-[30px] md:text-[41px] leading-[35px] md:leading-[49px] tracking-wide font-extrabold`}
                >
                  Top Selling Phones and Accessories
                </h2>
                <p className="uppercase text-xs md:text-sm font-medium leading-[35px] md:leading-[49px] tracking-[1px]">
                  discount upto 35%
                </p>
                <p className="flex items-center gap-2 justify-center md:justify-start">
                  <span className="text-sm md:text-base font-medium tracking-[1.3px]">
                    From
                  </span>
                  <span className="text-[20px] md:text-[27px] tracking-[1.78px] font-extrabold text-[#FF6500] leading-[25px] md:leading-[32px] animate-bounce transition-all">
                    ৳800
                  </span>
                </p>
                <button className="py-2 md:py-3 px-6 md:px-8 bg-[#FF6500] text-white text-xs md:text-sm font-medium tracking-[2px] uppercase hover:scale-105 hover:transition-all hover:bg-[#C40C0C] rounded-md mt-4">
                  SHOP NOW
                </button>
              </div>
              <div className="w-full h-[300px] md:h-[450px]">
                <img
                  src="https://i.ibb.co/mXhZ92j/PDP-Carousel-Apple-i-Phone-13-Blue-1500x1500px-image3.webp"
                  alt="Apple iPhone 15 Pro"
                  className="w-full h-full object-scale-down p-4"
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="relative">
            <div
              className={`${
                darkMode ? "dark" : "bg-slate-300"
              } absolute inset-0 bg-opacity-50 z-0`}
            ></div>
            <div className="relative flex flex-col md:flex-row justify-center items-center gap-5 z-10">
              <div className="text-center md:text-left pl-6">
                <button className="text-[12px] font-[600] leading-[15px] bg-[#C40C0C] text-white uppercase px-5 py-2 rounded-tr-lg rounded-br-lg rounded-bl-lg mb-4">
                  weekend Deal
                </button>
                <h2
                  className={`${
                    darkMode ? "text-white" : "text-[#414141]"
                  } text-[30px] md:text-[41px] leading-[35px] md:leading-[49px] tracking-wide font-extrabold`}
                >
                  Discount 50% on All Headphones
                </h2>
                <p className="uppercase text-xs md:text-sm font-medium leading-[35px] md:leading-[49px] tracking-[1px]">
                  Free Shipping Over ৳ 5000
                </p>
                <p className="flex items-center gap-2 justify-center md:justify-start">
                  <span className="text-sm md:text-base font-medium tracking-[1.3px]">
                    From
                  </span>
                  <span className="text-[20px] md:text-[27px] tracking-[1.78px] font-extrabold text-[#FF6500] leading-[25px] md:leading-[32px] animate-bounce transition-all">
                    ৳999
                  </span>
                </p>
                <button className="py-2 md:py-3 px-6 md:px-8 bg-[#FF6500] text-white text-xs md:text-sm font-medium tracking-[2px] uppercase hover:scale-105 hover:transition-all hover:bg-[#C40C0C] rounded-md mt-4">
                  SHOP NOW
                </button>
              </div>
              <div className="w-full h-[300px] md:h-[450px]">
                <img
                  src="https://proplugin.com/wp-content/uploads/2023/06/hi-x25bt_slider1.png"
                  alt="Carousel Image 2"
                  className="w-full h-full object-scale-down p-4"
                />
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="relative">
            <div
              className={`${
                darkMode ? "dark" : "bg-slate-300"
              } absolute inset-0 bg-opacity-50 z-0`}
            ></div>
            <div className="relative flex flex-col md:flex-row justify-center items-center gap-5 z-10">
              <div className="text-center md:text-left pl-6">
                <button className="text-[12px] font-[600] leading-[15px] bg-[#C40C0C] text-white uppercase px-5 py-2 rounded-tr-lg rounded-br-lg rounded-bl-lg mb-4">
                  Big Sale
                </button>
                <h2
                  className={`${
                    darkMode ? "text-white" : "text-[#414141]"
                  } text-[30px] md:text-[41px] leading-[35px] md:leading-[49px] tracking-wide font-extrabold`}
                >
                  Top Deals on Cameras
                </h2>
                <p className="uppercase text-xs md:text-sm font-medium leading-[35px] md:leading-[49px] tracking-[1px]">
                  Discount upto ৳ 5000 off
                </p>
                <p className="flex items-center gap-2 justify-center md:justify-start">
                  <span className="text-sm md:text-base font-medium tracking-[1.3px]">
                    From
                  </span>
                  <span className="text-[20px] md:text-[27px] tracking-[1.78px] font-extrabold text-[#FF6500] leading-[25px] md:leading-[32px] animate-bounce transition-all">
                    ৳5000
                  </span>
                </p>
                <button className="py-2 md:py-3 px-6 md:px-8 bg-[#FF6500] text-white text-xs md:text-sm font-medium tracking-[2px] uppercase hover:scale-105 hover:transition-all hover:bg-[#C40C0C] rounded-md mt-4">
                  SHOP NOW
                </button>
              </div>
              <div className="w-full h-[300px] md:h-[450px]">
                <img
                  src="https://i.ibb.co/r0xz8qX/polaroid-i-2-instant-camera-front.webp"
                  alt="Carousel Image 2"
                  className="w-full h-full object-scale-down p-4"
                />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
