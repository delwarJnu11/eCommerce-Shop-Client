import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/shared/Footer";
import { ThemeContext } from "./contexts";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <div className={`w-full h-full ${darkMode ? "dark text-white" : ""}`}>
        <Header />
        <div
          className={`pt-36 min-h-[calc(100vh-144px)] ${
            darkMode ? "dark" : "bg-gray-100"
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
