import React, { useState, useEffect } from 'react';
import { BiSolidPlaneAlt } from 'react-icons/bi';
import { IoBedSharp } from 'react-icons/io5';
import { FaCar, FaUmbrellaBeach } from 'react-icons/fa';
import { IoSparklesSharp } from "react-icons/io5";
import { IoGlobeOutline } from "react-icons/io5";
import { IoIosHeart } from "react-icons/io";
import { MdHome } from "react-icons/md";
import { MdOutlineFestival } from 'react-icons/md';




import Link from 'next/link'



const SidebarItem = ({ Icon, text, isOpen }) => {
  return (
    <li className="flex items-center hover:bg-gray-100 cursor-pointer group">
      <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
        <Icon className="text-gray-400 group-hover:text-teal-600 transition-colors duration-200" size={20} />
      </div>
      {isOpen && (
        <span className="whitespace-nowrap transition-opacity duration-300">
          {text}
        </span>
      )}
    </li>
  );
};

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    let timer;
    if (hovering) {
      timer = setTimeout(() => {
        setIsOpen(true);
      }, 400); //300
    } else {
      clearTimeout(timer);
      setIsOpen(false);
    }
    return () => clearTimeout(timer);
  }, [hovering, setIsOpen]);

  return (
    <div
      className={`h-screen bg-white fixed top-0 left-0 transform ${
        isOpen ? 'w-60' : 'w-16'
      } transition-all duration-300 ease-in-out pt-16 border-r border-gray-300 shadow-lg overflow-hidden`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <ul className="mt-6">
      <Link href={`/`}>
        <SidebarItem Icon={MdHome} text="Home" isOpen={isOpen} />
        </Link>  
      <Link href={`/Flight`}>
        <SidebarItem Icon={BiSolidPlaneAlt} text="Flights" isOpen={isOpen} />
        </Link>  
        <Link href={`/Stay`}>
        <SidebarItem Icon={IoBedSharp} text="Stays" isOpen={isOpen} />
        </Link>
        {/* <SidebarItem Icon={FaCar} text="Cars" isOpen={isOpen} /> */}
        <Link href={`/Packages`}>
        <SidebarItem Icon={FaUmbrellaBeach} text="Packages" isOpen={isOpen} />
        </Link>
        <Link href={`/Ask`}>
        <SidebarItem Icon={IoSparklesSharp } text="Ask Pak tour" isOpen={isOpen}  />
        </Link>
        <Link href={`/Trips`}>
        <SidebarItem Icon={IoIosHeart } text="Trips" isOpen={isOpen}  />
        </Link>
        <Link href={`/Explore`}>
        <SidebarItem Icon={IoGlobeOutline } text="Explore" isOpen={isOpen}  />
        </Link>
        <Link href={`/Cultural`}>
        <SidebarItem Icon={MdOutlineFestival } text="Cultural Experiences" isOpen={isOpen}  />
        </Link>
     

      </ul>
    </div>
  );
};

export default Sidebar;