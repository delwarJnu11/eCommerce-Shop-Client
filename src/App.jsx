import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/shared/Footer";
import { ThemeContext } from "./contexts";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <div className={` ${darkMode ? "dark" : "bg-slate-100"} font-mulish`}>
        <Header />
        <div
          className={`md:pt-36 sm:pt-44 min-h-[calc(100vh-144px)] container mx-auto z-50 ${
            darkMode ? "dark" : "bg-slate-100"
          } sm:px-2 scrollbar-thumb-gradient scrollbar-thin`}
        >
          <Outlet />
        </div>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
};
export default App;
