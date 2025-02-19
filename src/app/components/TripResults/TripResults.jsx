import React, { useState } from 'react';
import {
  FaHotel,
  FaUtensils,
  FaCar,
  FaMapMarkedAlt,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaUsers,
  FaClock,
  FaStar,
  FaChevronRight,
  FaChevronLeft,
  FaTimes,
  FaWifi,
  FaParking,
  FaCoffee,
  FaExpandAlt, FaMapMarkerAlt, FaRegThumbsUp


} from 'react-icons/fa';

const TripResults = ({ tripData }) => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [imageStartIndex, setImageStartIndex] = useState(0);
  const [hotelImageStartIndex, setHotelImageStartIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  if (!tripData) return null;

  const { trip_details, destination_images, hotel_images, daily_itinerary, total_cost, remaining_budget } = tripData;

  // Destination Images navigation
  const handleNextImages = () => {
    if (imageStartIndex + 4 < destination_images.length) {
      setImageStartIndex(prev => prev + 1);
    }
  };

  const handlePrevImages = () => {
    if (imageStartIndex - 1 >= 0) {
      setImageStartIndex(prev => prev - 1);
    }
  };

  // Hotel Images navigation
  const handleNextHotelImages = () => {
    if (hotelImageStartIndex + 4 < hotel_images.length) {
      setHotelImageStartIndex(prev => prev + 1);
    }
  };

  const handlePrevHotelImages = () => {
    if (hotelImageStartIndex - 1 >= 0) {
      setHotelImageStartIndex(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8">
      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-4xl rounded-lg p-1 bg-transparent">
            <button
              className="absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full shadow-lg text-gray-600 hover:text-gray-900 z-10"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <FaTimes className="text-xl" />
            </button>

            <div className="relative w-full h-[500px]">
              <img
                src={selectedImage}
                alt="Enlarged view"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 mt-9">
          Your Trip to {trip_details.destination}
        </h1>

        {/* Trip Overview Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center space-x-3">
              <FaCalendarAlt className="text-teal-500 text-xl" />
              <div>
                <p className="text-sm text-gray-500">Travel Date</p>
                <p className="font-medium">{trip_details.travel_date}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FaClock className="text-teal-500 text-xl" />
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">{trip_details.duration} days</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FaUsers className="text-teal-500 text-xl" />
              <div>
                <p className="text-sm text-gray-500">Travelers</p>
                <p className="font-medium">{trip_details.companions} people</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <FaMoneyBillWave className="text-teal-500 text-xl" />
              <div>
                <p className="text-sm text-gray-500">Budget</p>
                <p className="font-medium">Rs {trip_details.budget}</p>
              </div>
            </div>
          </div>

          {/* Destination Images Carousel */}
          <div className="relative mb-8">
            <div className="grid grid-cols-4 gap-2 h-24">
              {destination_images
                .slice(imageStartIndex, imageStartIndex + 4)
                .map((image, idx) => (
                  <div
                    key={image?.url}
                    className="rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
                    onClick={() => setSelectedImage(image?.url)}
                  >
                    <img
                      src={image?.url}
                      alt={`Destination ${imageStartIndex + idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
            </div>
            <div className="absolute inset-y-0 left-0 flex items-center">
              <button
                onClick={handlePrevImages}
                disabled={imageStartIndex === 0}
                className={`p-2 rounded-full bg-white shadow-lg transform -translate-x-1/2 
                  ${imageStartIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-teal-500 hover:bg-teal-50'}`}
              >
                <FaChevronLeft className="text-lg" />
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                onClick={handleNextImages}
                disabled={imageStartIndex + 4 >= destination_images.length}
                className={`p-2 rounded-full bg-white shadow-lg transform translate-x-1/2
                  ${imageStartIndex + 4 >= destination_images.length ? 'text-gray-300 cursor-not-allowed' : 'text-teal-500 hover:bg-teal-50'}`}
              >
                <FaChevronRight className="text-lg" />
              </button>
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
              <p className="text-sm text-gray-500">
                {imageStartIndex + 1}-{Math.min(imageStartIndex + 4, destination_images.length)} of {destination_images.length}
              </p>
            </div>
          </div>
        </div>

       

        {/* Day Selection */}
        <div className="flex space-x-2 overflow-x-auto pb-4 mb-8">
          {daily_itinerary.map((day, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedDay(idx)}
              className={`flex-shrink-0 px-6 py-3 rounded-xl transition-all ${selectedDay === idx
                  ? 'bg-teal-500 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
            >
              Day {day.day}
            </button>
          ))}
        </div>

        {/* Daily Content */}
        <div className="space-y-6">
          {/* Day Title, Date & Description */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <p className="text-gray-500 mb-1">{daily_itinerary[selectedDay].date}</p>
            <h2 className="text-2xl font-bold mb-2">
              {daily_itinerary[selectedDay].day_title}
            </h2>
            <p className="text-gray-600">
              {daily_itinerary[selectedDay].description}
            </p>
          </div>

          {/* Hotel */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <FaHotel className="text-teal-500 text-xl mr-3" />
              <h3 className="text-xl font-semibold">Your Stay</h3>
            </div>

            {/* Hotel Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left side - Main hotel image */}
              <div className="relative h-48 rounded-xl overflow-hidden">
                <img
                  src={hotel_images[0]?.url}
                  alt="Hotel main view"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onClick={() => setSelectedImage(hotel_images[0]?.url)}
                />
              </div>

              {/* Right side - Hotel info */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-lg font-medium">
                        {daily_itinerary[selectedDay].hotel.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {daily_itinerary[selectedDay].hotel.reviews} reviews
                      </p>
                    </div>
                    <div className="flex items-center bg-gray-50 px-2 py-1 rounded">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span className="font-medium">{daily_itinerary[selectedDay].hotel.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">
                    Enjoy your stay at this beautiful property with modern amenities and excellent service.
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-lg">
                      <span className="font-bold text-gray-900">
                        Rs {daily_itinerary[selectedDay].hotel.price}
                      </span>
                      <span className="text-gray-500">/night</span>
                    </div>
                    <a
                      href={daily_itinerary[selectedDay].hotel.booking_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                    >
                      Book Now
                    </a>
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex space-x-4 text-gray-500">
                  <div className="flex items-center">
                    <FaWifi className="mr-1" />
                    <span className="text-sm">Free WiFi</span>
                  </div>
                  <div className="flex items-center">
                    <FaParking className="mr-1" />
                    <span className="text-sm">Parking</span>
                  </div>
                  <div className="flex items-center">
                    <FaCoffee className="mr-1" />
                    <span className="text-sm">Breakfast</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

           {/* Hotel Images Carousel */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Hotel Recommendations</h2>
            <p className="text-gray-500">Handpicked accommodations for your stay</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevHotelImages}
              disabled={hotelImageStartIndex === 0}
              className={`p-2 rounded-full border transition-colors ${
                hotelImageStartIndex === 0
                  ? 'text-gray-300 border-gray-200 cursor-not-allowed'
                  : 'text-teal-500 border-teal-500 hover:bg-teal-50'
              }`}
            >
              <FaChevronLeft className="text-lg" />
            </button>
            <button
              onClick={handleNextHotelImages}
              disabled={hotelImageStartIndex + 4 >= hotel_images.length}
              className={`p-2 rounded-full border transition-colors ${
                hotelImageStartIndex + 4 >= hotel_images.length
                  ? 'text-gray-300 border-gray-200 cursor-not-allowed'
                  : 'text-teal-500 border-teal-500 hover:bg-teal-50'
              }`}
            >
              <FaChevronRight className="text-lg" />
            </button>
          </div>
        </div>

        {/* Updated Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {hotel_images
            .slice(hotelImageStartIndex, hotelImageStartIndex + 4)
            .map((image, idx) => (
              <div
                key={image?.url}
                className="group relative cursor-pointer"
                onClick={() => setSelectedImage(image?.url)}
              >
                <div className="relative pb-[75%] rounded-xl overflow-hidden">
                  <img
                    src={image?.url}
                    alt={`Hotel ${hotelImageStartIndex + idx + 1}`}
                    className="absolute inset-0 w-full h-full object-cover transform transition-transform group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                      <FaExpandAlt className="text-white text-2xl" />
                    </div>
                  </div>

                  {/* Image counter badge */}
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
                    {hotelImageStartIndex + idx + 1}/{hotel_images.length}
                  </div>
                </div>
              </div>
            ))}
        </div>

          {/* Hotel quick info */}
          {/* <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-2 mb-2">
                <FaStar className="text-yellow-400" />
                <span className="font-medium">Rating</span>
              </div>
              <p className="text-2xl font-bold">4.8/5</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-2 mb-2">
                <FaMoneyBillWave className="text-teal-500" />
                <span className="font-medium">Average Price</span>
              </div>
              <p className="text-2xl font-bold">$120/night</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-2 mb-2">
                <FaMapMarkerAlt className="text-teal-500" />
                <span className="font-medium">Location</span>
              </div>
              <p className="text-gray-600">City Center</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-2 mb-2">
                <FaRegThumbsUp className="text-teal-500" />
                <span className="font-medium">Reviews</span>
              </div>
              <p className="text-gray-600">500+ reviews</p>
            </div>
          </div> */}
        </div>

          {/* Activities */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <FaMapMarkedAlt className="text-teal-500 text-xl mr-3" />
              <h3 className="text-xl font-semibold">Today's Activities</h3>
            </div>
            <div className="space-y-4">
              {daily_itinerary[selectedDay].activities.map((activity, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                  <h4 className="font-medium mb-2">{activity.name}</h4>
                  <p className="text-gray-600 text-sm mb-2">
                    {activity.description}
                  </p>
                  <p className="font-medium">Rs {activity.cost}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Transportation */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <FaCar className="text-teal-500 text-xl mr-3" />
              <h3 className="text-xl font-semibold">Getting Around</h3>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex justify-between items-center">
                <span className="font-medium">{daily_itinerary[selectedDay].transportation.type}</span>
                <span className="font-medium">
                  Rs {daily_itinerary[selectedDay].transportation.cost}
                </span>
              </div>
            </div>
          </div>

          {/* Meals */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <FaUtensils className="text-teal-500 text-xl mr-3" />
              <h3 className="text-xl font-semibold">Meals</h3>
            </div>
            <div className="space-y-4">
              {daily_itinerary[selectedDay].meals.map((meal, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{meal.type}</h4>
                      <p className="text-gray-600 text-sm">{meal.venue}</p>
                    </div>
                    <span className="font-medium">Rs {meal.cost}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Budget Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Budget Summary</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-gray-600 mb-1">Total Cost</p>
                <p className="text-2xl font-bold">Rs {total_cost}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-gray-600 mb-1">Remaining Budget</p>
                <p className="text-2xl font-bold">Rs {remaining_budget}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripResults;
