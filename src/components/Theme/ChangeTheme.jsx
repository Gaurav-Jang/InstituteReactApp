import { useState, useEffect } from "react";
import { IoSunny, IoMoonSharp } from "react-icons/io5";

const ChangeTheme = () => {
  // dark mode
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <button
      className="flex items-center justify-center rounded-full transition-color duration-300"
      onClick={() => {
        setDarkMode(!darkMode);
      }}
    >
      <div className="relative rounded-full flex items-center justify-center transition duration-300">
        {darkMode ? (
          // moon
          <IoMoonSharp className="text-slate-500 dark:text-slate-300 xs:text-lg xl:text-2xl" />
        ) : (
          // sun
          <IoSunny className="text-yellow-500 dark:text-yellow-300 xs:text-lg xl:text-2xl" />
        )}
      </div>
    </button>
  );
};

export default ChangeTheme;
