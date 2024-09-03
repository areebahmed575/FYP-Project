import React from 'react';
import { CiHeart } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

const PropertyCard = ({ image, title, subtitle, beds, price, discountedPrice, total }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
    <div className="relative">
      <img src={image} alt={title} className="w-full h-64 object-cover" />
      <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md">
        <CiHeart className="w-6 h-6 text-gray-600" />
      </button>
    </div>
    <div className="p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
          <FaStar className="w-3 h-3 text-yellow-400 mr-1" />
          <span className="text-xs font-medium">New</span>
        </span>
      </div>
      <p className="text-sm text-gray-600">{subtitle}</p>
      <p className="text-sm text-gray-600 mt-1">{beds} {beds > 1 ? 'beds' : 'bed'}</p>
      <div className="mt-3 flex items-end">
        <span className="text-lg font-bold">${discountedPrice}</span>
        <span className="text-sm text-gray-500 line-through ml-2">${price}</span>
        <span className="text-sm text-gray-600 ml-1">night</span>
      </div>
      <p className="text-sm text-gray-600 mt-1">${total} total</p>
    </div>
  </div>
);

const PropertyListingPage = () => {
  const properties = [
    {
      image: "resort in skardu.webp",
      title: "Resort in Skardu",
      subtitle: "luxe • skardu • gilgit • snow",
      beds: 1,
      price: 57,
      discountedPrice: 46,
      total: 325
    },
    {
      image: "guest house.webp",
      title: "Guesthouse in Skardu",
      subtitle: "family guest room near skardu",
      beds: 1,
      price: 12,
      discountedPrice: 10,
      total: 71
    },
    {
      image: "hotelin skardu.webp",
      title: "Hotel in Skardu",
      subtitle: "Holiday Homes Skardu",
      beds: 9,
      price: 54,
      discountedPrice: 48,
      total: 338
    },{
      image: "resort in skardu.webp",
      title: "Resort in Skardu",
      subtitle: "luxe • skardu • gilgit • snow",
      beds: 1,
      price: 57,
      discountedPrice: 46,
      total: 325
    },
    {
      image: "guest house.webp",
      title: "Guesthouse in Skardu",
      subtitle: "family guest room near skardu",
      beds: 1,
      price: 12,
      discountedPrice: 10,
      total: 71
    },
    {
      image: "hotelin skardu.webp",
      title: "Hotel in Skardu",
      subtitle: "Holiday Homes Skardu",
      beds: 9,
      price: 54,
      discountedPrice: 48,
      total: 338
    }
    
  ];

  return (
    <div className="container mx-auto p-4 pt-14"> {/* Added pt-20 for top padding */}
      <h1 className="text-base font-medium mb-6">102 places in Skardu</h1> {/* Increased font size and weight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {properties.map((property, index) => (
              <PropertyCard key={index} {...property} />
            ))}
          </div>
        </div>
        <div className="hidden lg:block">
          <div className="sticky top-4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img src="https://maps.googleapis.com/maps/api/staticmap?center=Skardu,Pakistan&zoom=11&size=400x400&key=YOUR_API_KEY" alt="Map of Skardu" className="w-full h-96 object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyListingPage;