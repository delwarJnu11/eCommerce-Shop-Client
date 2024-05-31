import { useState } from "react";

const ToolTip = ({ children, text }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-[#FF6500] text-white text-xs rounded shadow-lg z-10 transition-all max-w-xs whitespace-nowrap">
          {text}
        </div>
      )}
    </div>
  );
};
export default ToolTip;
