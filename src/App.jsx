import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/shared/Footer";
import { ThemeContext } from "./contexts";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <div className={` ${darkMode ? "dark text-white" : ""} font-mulish`}>
        <Header />
        <div
          className={`pt-36 min-h-[calc(100vh-144px)] container mx-auto ${
            darkMode ? "dark" : "bg-slate-100"
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
