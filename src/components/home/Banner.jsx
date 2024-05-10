import { useEffect, useRef } from "react";
import SwiperCore from "swiper/core";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import banner1 from "../../assets/banner/banner1.jpg";
import banner2 from "../../assets/banner/banner2.jpg";
import banner3 from "../../assets/banner/banner3.jpg";
import banner4 from "../../assets/banner/banner4.jpg";
import banner5 from "../../assets/banner/banner5.jpg";

// Install Swiper modules
SwiperCore.use([Navigation, Pagination, Autoplay]);

const Banner = () => {
  const swiperRef = useRef(null);

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
    <Swiper
      ref={swiperRef}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      loop
      speed={1500}
      effect="fade"
      className="mt-6"
    >
      <SwiperSlide>
        <div className="w-full h-80 md:h-96 lg:h-108 flex items-center justify-center">
          <img className="h-full w-full object-fit" src={banner1} alt="" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full h-80 md:h-96 lg:h-108">
          <img className="w-full h-full object-fit" src={banner2} alt="" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full h-80 md:h-96 lg:h-108">
          <img className="w-full h-full object-fit" src={banner3} alt="" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full h-80 md:h-96 lg:h-108">
          <img className="w-full h-full object-fit" src={banner4} alt="" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full h-80 md:h-96 lg:h-108">
          <img className="w-full h-full object-fit" src={banner5} alt="" />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};
export default Banner;
