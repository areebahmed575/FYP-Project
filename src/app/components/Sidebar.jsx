import React from 'react';
import { FaPlane, FaHotel, FaCar, FaSuitcase } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-theme-Lightgreen p-4">
      <ul>
        <li className="flex items-center space-x-2 p-2 hover:bg-theme-green cursor-pointer group rounded">
          <FaPlane className="text-gray-500 group-hover:text-white" />
          <span className='group-hover:text-white'>Flights</span>
        </li>
        <li className="flex items-center space-x-2 p-2 hover:bg-theme-green cursor-pointer group rounded">
          <FaHotel className="text-gray-500 group-hover:text-white" />
          <span className='group-hover:text-white'>Stays</span>
        </li>
        <li className="flex items-center space-x-2 p-2 hover:bg-theme-green cursor-pointer group rounded">
          <FaCar className="text-gray-500 group-hover:text-white" />
          <span className='group-hover:text-white'>Cars</span>
        </li>
        <li className="flex items-center space-x-2 p-2 hover:bg-theme-green cursor-pointer group rounded">
          <FaSuitcase className="text-gray-500 group-hover:text-white" />
          <span className='group-hover:text-white'>Packages</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
