import { Outlet } from "react-router-dom";
import Footer from "./components/shared/Footer";
import Header from "./components/shared/Header";

const App = () => {
  return (
    <>
      <Header />
      <div className="bg-gray-100 pt-20">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export default App;
