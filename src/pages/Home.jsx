import Banner from "../components/home/Banner";
import CategorizedProducts from "../components/home/CategorizedProducts";
import CategoryList from "../components/home/CategoryList";

const Home = () => {
  return (
    <div className="container mx-auto py-4">
      <CategoryList />
      <Banner />
      <CategorizedProducts productCategory="airpod" heading="Top Airpodes" />
      <CategorizedProducts productCategory="mobile" heading="Mobile Phones" />
      <CategorizedProducts
        productCategory="camera"
        heading="Camera & Tripod's"
      />
      <CategorizedProducts productCategory="television" heading="Television" />
      <CategorizedProducts
        productCategory="camera"
        heading="Camera & Tripod's"
      />
      <CategorizedProducts productCategory="earphone" heading="Earphones" />
      <CategorizedProducts productCategory="watch" heading="Watches" />
      <CategorizedProducts productCategory="trimmer" heading="Trimmers" />
      <CategorizedProducts productCategory="speaker" heading="Speakers" />
      <CategorizedProducts productCategory="mouse" heading="Mouse" />
      <CategorizedProducts productCategory="printer" heading="Printers" />
      <CategorizedProducts
        productCategory="refrigerator"
        heading="Refrigerators"
      />
      <CategorizedProducts productCategory="processor" heading="Processor's" />
    </div>
  );
};
export default Home;
