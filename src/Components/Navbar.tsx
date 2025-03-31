import React, { useEffect, useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const theme = localStorage.getItem("taskspheretheme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);
  function toggleTheme() {
    const root = document.documentElement;
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      localStorage.setItem("taskspheretheme", "light");
    } else {
      root.classList.add("dark");
      localStorage.setItem("taskspheretheme", "dark");
    }
  }

  const handleisdarkToggle = () => {
    toggleTheme();
    setIsDark(!isDark);
  };

  const navlinkobj = [
    {
      id: 1,
      link: "/",
      name: "Home",
    },
    {
      id: 2,
      link: "/todo",
      name: "todo",
    },
    {
      id: 3,
      link: "/weather",
      name: "weather",
    },
    {
      id: 4,
      link: "/tracker",
      name: "Expense Tracker",
    },
    {
      id: 5,
      link: "/notepad",
      name: "notepad",
    },
    // {
    //   id: 6,
    //   link: "/calculator",
    //   name: "calculator",
    // }
  ];
  return (
    <nav className="navbar_style shadow-md w-full">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          TaskSphere
        </Link>
        <div className="lg:hidden flex gap-5">
          <button
            onClick={handleisdarkToggle}
            className=" flex justify-center items-center cursor-pointer"
          >
            <div className="themetoggle relative w-12 h-6 rounded-full py-1 flex justify-between items-center">
              <span>🌜</span>
              <span>🌞</span>
              <span className={`w-5 h-5 rounded-full  absolute ${isDark ? 'left-0 bg-black' : 'right-0 bg-white'}`}></span>
            </div> 
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none"
          >
            
            {isOpen ? <IoClose size={24} /> : <CiMenuFries size={24} />}
          </button>
        </div>
        <ul
          className={`md:flex md:space-x-6 absolute md:relative z-20 navbar_style  w-full md:w-auto left-0 top-14 md:top-0  shadow-md md:shadow-none ${
            isOpen ? "block" : "hidden"
          }`}
        >
          {navlinkobj.map((item, index) => {
            return (
              <li key={index}>
                <Link
                  to={item.link}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text_style capitalize"
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
          <li
            onClick={handleisdarkToggle}
            className=" lg:flex hidden justify-center items-center cursor-pointer"
          >
            <div className="themetoggle relative w-12 h-6 rounded-full py-1 flex justify-between items-center">
              <span>🌜</span>
              <span>🌞</span>
              <span className={`w-5 h-5 rounded-full  absolute ${isDark ? 'left-0 bg-black' : 'right-0 bg-white'}`}></span>
            </div>  
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
