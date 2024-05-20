import { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/shared/Footer";
import Header from "./components/shared/Header";
import { ThemeContext } from "./contexts";

const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  console.log(darkMode);
  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <div className={`w-full h-full ${darkMode ? "dark text-white" : ""}`}>
        <Header />
        <div
          className={`${
            darkMode ? "dark text-white  pt-20" : "bg-gray-100 pt-20"
          } sm:px-2`}
        >
          <Outlet />
        </div>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
};
export default App;
