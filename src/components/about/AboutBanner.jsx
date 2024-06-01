import CountUp from "react-countup";

const AboutBanner = () => {
  return (
    <>
      <h2 className="uppercase text-3xl font-bold tracking-widest mt-8 text-[#474545]">
        explore shopee
      </h2>
      <hr className="mt-3" />
      <div className="relative my-8 flex flex-col justify-center items-center w-full h-[70vh] rounded-lg overflow-hidden">
        <div
          style={{
            background: "url('https://i.ibb.co/0cZqVQ2/about-1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="absolute inset-0 w-full h-full"
        ></div>
        <div className="absolute inset-0 w-full h-full bg-black opacity-70"></div>
        <div className="relative text-center text-white z-10">
          <p className="text-base font-medium tracking-widest py-2 uppercase">
            start from since 2020
          </p>
          <h2 className="text-[45px] font-extrabold leading-[54px] capitalize tracking-wide my-4">
            We Help Everyone <br /> Enjoy Amazing Products
          </h2>

          <div className="flex justify-around items-center gap-4 mt-6">
            <div>
              <p className="text-[45px] leading-[66px] font-[900] tracking-[1px]">
                <CountUp start={1} end={6} duration={1} />
                M+
              </p>
              <p className="capitalize text-lg tracking-wider">happy clients</p>
            </div>
            <div>
              <p className="text-[45px] leading-[66px] font-[900] tracking-[1px]">
                <CountUp start={1} end={4} duration={1} />
                M+
              </p>
              <p className="capitalize text-lg tracking-wider">
                Great Products
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AboutBanner;
