import React, { useState, useEffect } from 'react';
import { BiSolidPlaneAlt } from 'react-icons/bi';
import { IoBedSharp } from 'react-icons/io5';
import { FaCar, FaUmbrellaBeach } from 'react-icons/fa';
import { IoSparklesSharp } from "react-icons/io5";
import { IoGlobeOutline } from "react-icons/io5";
import { IoIosHeart } from "react-icons/io";
import { MdHome } from "react-icons/md";
import { MdOutlineFestival } from 'react-icons/md';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const SidebarItem = ({ Icon, text, isOpen, href, isSelected }) => {
  return (
    <motion.li
      whileHover={{ x: 5 }}
      className={`flex items-center cursor-pointer group mx-2 my-1 ${
        isSelected ? 'bg-gray-200 rounded-lg' : ''
      }`}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        className={`w-12 h-12 flex items-center justify-center flex-shrink-0 ${
          isSelected ? 'ml-0' : ''
        }`}
      >
        <Icon
          className={`${
            isSelected ? 'text-teal-600' : 'text-gray-400'
          } group-hover:text-teal-600 transition-colors duration-200`}
          size={20}
        />
      </motion.div>
      {isOpen && (
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className={`whitespace-nowrap ${isSelected ? 'ml-3' : 'ml-2'}`}
        >
          {text}
        </motion.span>
      )}
    </motion.li>
  );
};

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [hovering, setHovering] = useState(false);
  const pathname = usePathname();

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
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 120 }}
      className={`h-screen bg-white/80 backdrop-blur-md fixed top-0 left-0 transform ${
        isOpen ? 'w-60' : 'w-16'
      } transition-all duration-300 ease-in-out pt-16 border-r border-gray-200 shadow-md overflow-hidden`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-6 space-y-2"
      >
        <Link href={`/`}>
          <SidebarItem Icon={MdHome} text="Home" isOpen={isOpen} isSelected={pathname === '/'} />
        </Link>  
        <Link href={`/Flight`}>
          <SidebarItem Icon={BiSolidPlaneAlt} text="Flights" isOpen={isOpen} isSelected={pathname === '/Flight'} />
        </Link>  
        <Link href={`/Stay`}>
          <SidebarItem Icon={IoBedSharp} text="Stays" isOpen={isOpen} isSelected={pathname === '/Stay'} />
        </Link>
        {/* <SidebarItem Icon={FaCar} text="Cars" isOpen={isOpen} /> */}
        <Link href={`/Packages`}>
          <SidebarItem Icon={FaUmbrellaBeach} text="Packages" isOpen={isOpen} isSelected={pathname === '/Packages'} />
        </Link>
        <Link href={`/Ask`}>
          <SidebarItem Icon={IoSparklesSharp } text="Ask Pak tour" isOpen={isOpen} isSelected={pathname === '/Ask'} />
        </Link>
        <Link href={`/Trips`}>
          <SidebarItem Icon={IoIosHeart } text="Trips" isOpen={isOpen} isSelected={pathname === '/Trips'} />
        </Link>
        <Link href={`/Explore`}>
          <SidebarItem Icon={IoGlobeOutline } text="Explore" isOpen={isOpen} isSelected={pathname === '/Explore'} />
        </Link>
        <Link href={`/Cultural`}>
          <SidebarItem Icon={MdOutlineFestival } text="Cultural Experiences" isOpen={isOpen} isSelected={pathname === '/Cultural'} />
        </Link>
      </motion.ul>
    </motion.div>
  );
};

export default Sidebar;