import React, { useState, useEffect } from 'react';
import { BiSolidPlaneAlt } from 'react-icons/bi';
import { IoBedSharp } from 'react-icons/io5';
import { FaCar, FaUmbrellaBeach } from 'react-icons/fa';
import { IoSparklesSharp } from "react-icons/io5";
import { IoGlobeOutline } from "react-icons/io5";
import { IoIosHeart } from "react-icons/io";
import { MdHome } from "react-icons/md";
import { MdOutlineFestival } from 'react-icons/md';
import { FaRoute } from 'react-icons/fa'; 
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const SidebarItem = ({ Icon, text, isOpen, href, isSelected }) => {
  return (
    <motion.li
      whileHover={{ x: 5 }}
      className={`flex items-center cursor-pointer group mx-1 sm:mx-2 my-1 ${
        isSelected ? 'bg-gray-200 rounded-lg' : ''
      }`}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        className={`w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center flex-shrink-0 ${
          isSelected ? 'ml-0' : ''
        }`}
      >
        <Icon
          className={`${
            isSelected ? 'text-teal-600' : 'text-gray-400'
          } group-hover:text-teal-600 transition-colors duration-200`}
          size={isOpen ? 20 : 18}
        />
      </motion.div>
      {isOpen && (
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className={`whitespace-nowrap text-sm sm:text-base ${isSelected ? 'ml-2 sm:ml-3' : 'ml-1 sm:ml-2'}`}
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
  const [isMobile, setIsMobile] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setScreenWidth(window.innerWidth);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let timer;
    if (hovering && !isMobile) {
      timer = setTimeout(() => {
        setIsOpen(true);
      }, 400);
    } else if (!hovering && !isMobile) {
      timer = setTimeout(() => {
        setIsOpen(false);
      }, 300);
    }
    return () => clearTimeout(timer);
  }, [hovering, setIsOpen, isMobile]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobile && isOpen && !e.target.closest('.sidebar')) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobile, isOpen, setIsOpen]);

  return (
    <AnimatePresence>
      {(!isMobile || (isMobile && isOpen)) && (
        <>
          {/* Overlay for mobile */}
          {isMobile && isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-[14]"
              onClick={() => setIsOpen(false)}
            />
          )}
          
          {/* Sidebar */}
          <motion.div
            initial={isMobile ? { x: '-100%', opacity: 0.8 } : { x: -250 }}
            animate={{ x: 0, opacity: 1 }}
            exit={isMobile ? { x: '-100%', opacity: 0 } : { x: -250 }}
            transition={isMobile ? 
              { type: 'tween', duration: 0.25, ease: [0.25, 0.1, 0.25, 1] } : 
              { type: 'spring', stiffness: 120, damping: 20 }
            }
            className={`sidebar h-screen fixed top-0 left-0 transform ${
              isOpen && isMobile ? 'w-full' : isOpen ? 'w-48 sm:w-60' : 'w-12 sm:w-16'
            } bg-white/98 backdrop-blur-md transition-all duration-200 ease-in-out pt-16 border-r border-gray-200 shadow-lg overflow-hidden z-[15]`}
            style={isMobile && isOpen ? { maxWidth: screenWidth } : {}}
            onMouseEnter={() => !isMobile && setHovering(true)}
            onMouseLeave={() => !isMobile && setHovering(false)}
          >
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 }}
              className="mt-3 sm:mt-6 space-y-1 sm:space-y-2"
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
              <Link href={`/Packages`}>
                <SidebarItem Icon={FaUmbrellaBeach} text="Packages" isOpen={isOpen} isSelected={pathname === '/Packages'} />
              </Link>
              <Link href={`/Ask`}>
                <SidebarItem Icon={IoSparklesSharp} text="Ask Pak tour" isOpen={isOpen} isSelected={pathname === '/Ask'} />
              </Link>
              <Link href={`/Ask2`}>
                <SidebarItem Icon={FaRoute} text="Create Itinerary" isOpen={isOpen} isSelected={pathname === '/Ask2'} />
              </Link>
              <Link href={`/Trips`}>
                <SidebarItem Icon={IoIosHeart} text="Trips" isOpen={isOpen} isSelected={pathname === '/Trips'} />
              </Link>
              <Link href={`/Explore`}>
                <SidebarItem Icon={IoGlobeOutline} text="Explore" isOpen={isOpen} isSelected={pathname === '/Explore'} />
              </Link>
              <Link href={`/Cultural`}>
                <SidebarItem Icon={MdOutlineFestival} text="Cultural Experiences" isOpen={isOpen} isSelected={pathname === '/Cultural'} />
              </Link>
            </motion.ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;