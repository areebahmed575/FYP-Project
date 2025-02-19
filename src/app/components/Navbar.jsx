"use client"
import React, { useState, useEffect } from 'react';
import { HiBars3 } from "react-icons/hi2";
import Link from 'next/link'
import SearchBar from './SearchBar/SearchBar';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiUser } from 'react-icons/fi';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Dropdown from '../components/Dropdown/Dropdown'

const Navbar = ({ toggleSidebar }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { data, status } = useSession()
  const isLogin = status === 'unauthenticated' ? false : true
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 700);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isPropertyListing = pathname === '/PropertyListing';
  const isSinglePropertyListing = pathname === '/SinglePropertyListing';
  const showSearchBar = isPropertyListing || isSinglePropertyListing;

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120 }}
      className="flex justify-between items-center p-1 sm:p-2 md:p-4 gap-1 sm:gap-2 bg-white/80 backdrop-blur-md w-full fixed top-0 z-20 border-b border-gray-200 shadow-sm"
    >
      <div className="flex items-center space-x-2 sm:space-x-4">
        {!showSearchBar && (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <HiBars3 className="text-xl sm:text-2xl cursor-pointer ml-1 sm:ml-2 text-teal-600" onClick={toggleSidebar} size={24} />
          </motion.div>
        )}
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="hidden md:flex text-xl lg:text-2xl font-bold bg-gradient-to-r from-teal-500 to-blue-500 text-transparent bg-clip-text"
          >
            PakiGenTravel
          </motion.div>
        </Link>
      </div>
      
      {showSearchBar && (
        <div className="flex-grow max-w-xs sm:max-w-md md:max-w-xl mx-1 sm:mx-2 md:mx-4">
          <SearchBar isCompact={true} />
        </div>
      )}
      
      {!showSearchBar && isScrolled && (
        <div className="flex-grow max-w-xs sm:max-w-md md:max-w-xl mx-1 sm:mx-2 md:mx-4">
          <SearchBar isCompact={true} />
        </div>
      )}
      
      {!isLogin ? (
        <Link href={"/SignIn"}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-2 py-1 sm:py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 flex items-center space-x-1 lg:space-x-2 text-xs sm:text-sm lg:text-base">
              <FiUser className='hidden md:flex'/>
              <span>Sign in</span>
            </button>
          </motion.div>
        </Link>
      ) : (
        <>
          <div className='relative w-8 h-8 sm:w-10 sm:h-10 md:w-[50px] md:h-[50px] rounded-full cursor-pointer' onClick={() => setOpen(!open)}>
            <Image src={data?.user.image} fill className='rounded-full object-cover' />
            {open && <Dropdown />}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Navbar;