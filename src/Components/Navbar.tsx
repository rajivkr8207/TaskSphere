import React, { useState } from 'react';
import { CiMenuFries } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md w-full">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">TaskSphere</Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          {isOpen ? <IoClose size={24} /> : <CiMenuFries size={24} />}
        </button>
        <ul
          className={`md:flex md:space-x-6 absolute md:relative z-20 bg-white w-full md:w-auto left-0 top-14 md:top-0 transition-all ease-in duration-300 shadow-md md:shadow-none ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <li>
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:text-blue-500"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/todo"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:text-blue-500"
            >
              Todo
            </Link>
          </li>
          <li>
            <Link
              to="/weather"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:text-blue-500"
            >
              weather
            </Link>
          </li>
          <li>
            <Link
              to="/tracker"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-gray-700 hover:text-blue-500"
            >
              Expense Tracker
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
