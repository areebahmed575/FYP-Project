import React from 'react';
import { FaBars } from 'react-icons/fa';
import Link from 'next/link'

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-white w-full fixed top-0 z-10 border-b border-gray-300 shadow-lg">
      <div className="flex items-center space-x-4">
        <FaBars className="text-2xl cursor-pointer ml-2" onClick={toggleSidebar} size={15} />
        <Link href="/"><div className="text-2xl font-bold text-orange-600">Tourism</div> </Link>
       
      </div>
      <div>
        <button className="bg-orange-600 text-white px-4 py-2 rounded shadow hover:bg-orange-700 transition duration-300">Sign in</button>
      </div>
    </div>
  );
};

export default Navbar;
