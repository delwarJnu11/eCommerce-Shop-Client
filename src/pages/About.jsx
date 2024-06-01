import AboutBanner from "../components/about/AboutBanner";
import AboutPerformance from "../components/about/AboutPerformance";
import AboutShopee from "../components/about/AboutShopee";
import OurBrands from "../components/home/OurBrands";

const About = () => {
  return (
    <div>
      <AboutBanner />
      <AboutShopee />
      <AboutPerformance />
      <div className="pb-12">
        <OurBrands />
      </div>
    </div>
  );
};
export default About;
