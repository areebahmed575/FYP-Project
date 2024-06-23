import React from 'react';

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 text-gray-500">
      <div className="text-2xl font-bold">Toursim Website</div>
      <div>
        <button className=" bg-white text-gray-500  px-4 py-2 rounded">Sign in</button>
      </div>
    </div>
  );
};

export default Navbar;
