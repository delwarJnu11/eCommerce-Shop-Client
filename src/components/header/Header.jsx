import Navbar from "./Navbar";
import TopBar from "./TopBar";

const Header = () => {
  return (
    <header className="bg-[#181515] text-white w-full h-36 fixed top-0 z-40">
      <TopBar />
      <hr className="border-b border-gray-700" />
      <div className="container mx-auto ">
        <Navbar />
      </div>
    </header>
  );
};
export default Header;
