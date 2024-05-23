import { useTheme } from "../../hooks/useTheme";

const Heading = ({ value }) => {
  const { darkMode } = useTheme();
  return (
    <h2
      className={`mb-10 mt-16 capitalize border-b pb-6 font-bold text-3xl tracking-wider ${
        darkMode ? "text-white" : "text-[#414141]"
      }`}
    >
      {value}
    </h2>
  );
};
export default Heading;
