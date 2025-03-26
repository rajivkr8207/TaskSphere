import React, { useEffect, useState } from 'react';
import { CiMenuFries } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { FaSun, FaMoon } from "react-icons/fa";
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        setIsDark(true)
    }
    
  }, [])
  function toggleTheme() {
    const root = document.documentElement;
    if (root.classList.contains('dark')) {
        root.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        root.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

  const handleisdarkToggle = () => {
    toggleTheme()
    setIsDark(!isDark)
  }
  return (
    <nav className="navbar_style shadow-md w-full">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">TaskSphere</Link>
        <div className='lg:hidden flex gap-5'>
        <button onClick={handleisdarkToggle} className=' flex justify-center items-center cursor-pointer'>
{isDark ? <FaSun className='text-2xl ' /> : <FaMoon className='text-2xl ' />}
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
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <li>
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text_style hover:text-blue-500"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/todo"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text_style hover:text-blue-500"
            >
              Todo
            </Link>
          </li>
          <li>
            <Link
              to="/weather"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text_style hover:text-blue-500"
            >
              weather
            </Link>
          </li>
          <li>
            <Link
              to="/tracker"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text_style hover:text-blue-500"
            >
              Expense Tracker
            </Link>
          </li>
          <li onClick={handleisdarkToggle} className=' lg:flex hidden justify-center items-center cursor-pointer'>
{isDark ? <FaSun className='text-xl ' /> : <FaMoon className='text-xl ' />}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
