import React, { useState, useEffect } from 'react';
import { HiBars3 } from "react-icons/hi2";
import Link from 'next/link'
import SearchBar from './SearchBar/SearchBar';
import { usePathname } from 'next/navigation';

const Navbar = ({ toggleSidebar }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 700);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isPropertyListing = pathname === '/PropertyListing';

  return (
    <div className="flex justify-between items-center p-4 bg-white w-full fixed top-0 z-20 border-b border-gray-300 shadow-lg">
      <div className="flex items-center space-x-4">
        {!isPropertyListing && (
          <HiBars3 className="text-2xl cursor-pointer ml-2" onClick={toggleSidebar} size={24} />
        )}
        <Link href="/"><div className="text-2xl font-bold text-teal-600">PakiGenTravel</div></Link>
      </div>
      {isScrolled && (
        <div className="flex-grow max-w-xl mx-4">
          <SearchBar isCompact={true} />
        </div>
      )}
      <div>
        <button className="bg-teal-600 text-white px-4 py-2 rounded shadow hover:bg-teal-700 transition duration-300">Sign in</button>
      </div>
    </div>
  );
};

export default Navbar;