import React from 'react';
import { FaPlane, FaHotel, FaCar, FaSuitcase } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-100 p-4">
      <ul>
        <li className="flex items-center space-x-2 p-2 hover:bg-gray-200 cursor-pointer">
          <FaPlane className="text-gray-500" />
          <span>Flights</span>
        </li>
        <li className="flex items-center space-x-2 p-2 hover:bg-gray-200 cursor-pointer">
          <FaHotel className="text-gray-500" />
          <span>Stays</span>
        </li>
        <li className="flex items-center space-x-2 p-2 hover:bg-gray-200 cursor-pointer">
          <FaCar className="text-gray-500" />
          <span>Cars</span>
        </li>
        <li className="flex items-center space-x-2 p-2 hover:bg-gray-200 cursor-pointer">
          <FaSuitcase className="text-gray-500" />
          <span>Packages</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
