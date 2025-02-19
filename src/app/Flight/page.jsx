"use client"

import { useState } from 'react'
import Image from 'next/image'
import { FaPlaneDeparture, FaHotel, FaCalendarAlt, FaMoneyBillWave, FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import { BsArrowRight, BsStarFill, BsAirplane } from 'react-icons/bs';
import { MdLocationOn, MdEmail } from 'react-icons/md';

export default function FlightPage() {
  const [loading, setLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [travelData, setTravelData] = useState(null);
  const [message, setMessage] = useState('');
  const [emailTo, setEmailTo] = useState('');
  const [emailSubject, setEmailSubject] = useState('Your Travel Itinerary');


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:8000/plan_trip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          initial_message: message,
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch travel plans');

      const data = await response.json();
      console.log("data", data)
      setTravelData(JSON.parse(data.replace(/```json\n|\n```/g, '')));
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendEmail = async () => {
    if (!emailTo) {
      alert('Please enter an email address');
      return;
    }

    setEmailLoading(true);

    try {
      const response = await fetch('http://localhost:8000/send_email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_to: emailTo,
          subject: emailSubject,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      alert('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email');
    } finally {
      setEmailLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Enhanced Hero Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative h-[85vh] rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0">
            <Image
              src="/skardu.jpeg"
              alt="Pakistani Culture"
              layout="fill"
              objectFit="cover"
              className="transform scale-105 transition-transform duration-1000 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30" />
          </div>

          <div className="relative h-full flex flex-col items-center justify-center px-4 space-y-8">
            <h1 className="text-6xl md:text-7xl font-bold text-white text-center leading-tight tracking-tight">
              Discover Pakistan's
              <span className="block text-teal-400 text-shadow-lg">Hidden Treasures</span>
            </h1>

            <p className="text-2xl text-gray-200 text-center max-w-3xl font-light">
              Experience the beauty and culture of Pakistan with our AI-powered travel planner
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Search Form */}
      <div className="w-full flex justify-center items-center px-4 -mt-20 relative z-10">
        <div className="w-full max-w-4xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
          >
            <div className="relative">
              <div className="absolute left-4 top-4">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-teal-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <textarea
                className="w-full pl-14 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-none text-gray-700 text-lg"
                rows={3}
                placeholder="Tell us about your dream Pakistani adventure..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-4 bg-teal-500 text-white rounded-xl font-medium shadow-md hover:shadow-lg hover:bg-teal-600 transition-all duration-300 flex items-center justify-center space-x-3"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
              ) : (
                <>
                  <FaSearch className="h-5 w-5" />
                  <span className="text-lg font-semibold">Plan My Journey</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>


      {/* Results Section */}
      {travelData && (
        <div className="max-w-7xl mx-auto px-4 py-16 space-y-12">
          {/* Flights Section */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <BsAirplane className="mr-3 text-teal-600" />
                Available Flights
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 p-6">
              {travelData.flights.map((flight, index) => (
                <div key={index}
                  className="group relative bg-white rounded-xl border border-gray-200 p-4 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-6">
                    <img src={flight.airline_logo} alt={flight.airline} className="h-8" />
                    <span className="text-lg font-semibold text-teal-600">
                      {flight.price.toLocaleString()} {flight.currency}
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between relative">
                      <div className="text-center">
                        <p className="font-bold text-xl">{flight.departure_time}</p>
                        <p className="text-sm text-gray-500">{flight.departure_airport}</p>
                      </div>
                      <div className="flex-1 mx-4 relative">
                        <div className="border-t-2 border-gray-300 absolute w-full top-1/2 -translate-y-1/2" />
                        <BsArrowRight className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-teal-600 bg-white px-2" />
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-xl">{flight.arrival_time}</p>
                        <p className="text-sm text-gray-500">{flight.arrival_airport}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-600">Duration: {flight.duration}</p>
                    </div>
                    <a
                      href={flight.booking_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 text-center text-teal-600 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors duration-300"
                    >
                      Book Flight
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hotels Section */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <FaHotel className="mr-3 text-teal-600" />
                Recommended Hotels
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 p-6">
              {travelData.hotels.map((hotel, index) => (
                <div key={index}
                  className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-48">
                    <img
                      src={hotel?.hotel_logo}
                      alt={hotel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <div className="flex items-center space-x-1">
                        <BsStarFill className="text-yellow-400 w-4 h-4" />
                        <span className="text-sm font-medium">{hotel.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900">{hotel.name}</h3>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">{hotel.description}</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <MdLocationOn className="w-4 h-4 mr-1" />
                        {hotel.location}
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">Per night</p>
                          <p className="text-lg font-bold text-teal-600">
                            {hotel.price_per_night.toLocaleString()} {hotel.currency}
                          </p>
                        </div>
                        <a
                          href={hotel.booking_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-100 transition-colors duration-300"
                        >
                          Book Now
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total Price Section */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-500 rounded-2xl shadow-xl p-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              <div className="text-white">
                <h2 className="text-2xl font-bold flex items-center">
                  <FaMoneyBillWave className="mr-3" />
                  Total Package Value
                </h2>
                <p className="text-4xl font-bold mt-2">
                  {travelData.total_package_price.toLocaleString()} {travelData.currency}
                </p>
              </div>
              <div className="flex flex-col space-y-4 w-full md:w-auto md:min-w-[300px]">
                <div className="relative">
                  <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={emailTo}
                    onChange={(e) => setEmailTo(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Email subject"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                />
                <button
                  onClick={sendEmail}
                  disabled={emailLoading}
                  className="group w-full px-8 py-4 bg-white text-teal-600 rounded-xl font-medium shadow-lg hover:bg-teal-50 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center justify-center space-x-2">
                    {emailLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-teal-600" />
                    ) : (
                      <>
                        <MdEmail className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                        <span>Send to Email</span>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-teal-800 text-white text-center mt-16 mx-4 mb-4 p-6 rounded-lg shadow-xl">
        <p>&copy; 2024 AI-Powered Tourism. All rights reserved.</p>
      </footer>

    </div>
  );
}