'use client';
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import AuthProvider from "./Providers/AuthProvider";
import StoreProvider from "./Providers/StoreProvider";

const roboto = Inter({ subsets: ["latin"], weight: "400" });

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsSidebarOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const isPropertyListing = pathname === '/PropertyListing';
  const isSinglePropertyListing = pathname === '/SinglePropertyListing';
  const hideSidebar = isPropertyListing || isSinglePropertyListing;
  
  // Close sidebar on route change for mobile
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [pathname, isMobile]);

  return (
    <html lang="en">
      <body className={roboto.className}>
        <AuthProvider>
          <StoreProvider>
            <Navbar toggleSidebar={toggleSidebar} />
            <div className="flex relative pt-12 sm:pt-16">
              {!hideSidebar && (
                <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
              )}
              <div 
                className={`flex-1 transition-all duration-300 ease-in-out px-2 sm:px-4 ${
                  !hideSidebar && (isSidebarOpen && !isMobile
                    ? 'ml-48 sm:ml-52 md:ml-52' 
                    : isSidebarOpen && isMobile
                    ? 'ml-0' // Don't push content on mobile when sidebar is open
                    : 'ml-0 md:ml-16') // Don't show sidebar by default on mobile
                }`}
              >
                <main>{children}</main>
              </div>
            </div>
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}