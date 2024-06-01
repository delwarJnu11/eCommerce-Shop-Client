const AboutPerformance = () => {
  return (
    <div className="flex sm:flex-col md:flex-row justify-center items-center gap-4 py-16">
      <div className="md:w-1/2 p-4">
        <h4 className="text-base font-medium tracking-widest py-2 uppercase">
          our performance
        </h4>
        <h2 className="text-[45px] font-extrabold leading-[54px] capitalize tracking-wide my-4 text-[#414141]">
          We Believe In <br />
          Quality Products
        </h2>
        <p className="text-[15px] leading-6 tracking-wider text-gray-700">
          Product quality feeds are formulated to enhance quality
          characteristics of market products. These characteristics include
          sensory attributes, such as color, flavor and texture, color and
          flavor, nutritional attributes, such as docosahexaenoic acid (DHA) and
          eicosapentaenoic acid (EPA) content, and shelf life of products. Color
          is the primary characteristic associated with product quality feeds
          for salmon, and astaxanthin is the carotenoid responsible for fillet
          pigmentation.
        </p>
      </div>
      <div className="md:w-1/2 p-4">
        <img
          src="https://i.ibb.co/wBpbjRR/about-2.jpg"
          className="w-full h-full object-cover rounded-md"
          alt=""
        />
      </div>
    </div>
  );
};
export default AboutPerformance;
