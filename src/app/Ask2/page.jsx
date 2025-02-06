'use client'
import React, { useState } from "react";

export default function Page() {
  const [destination, setDestination] = useState("New York");
  const [travelDate, setTravelDate] = useState("");
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState("low");
  const [travelCompanion, setTravelCompanion] = useState("solo");
  const [activities, setActivities] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      destination,
      travelDate,
      days,
      budget,
      travelCompanion,
      activities,
    });
  };

  const toggleActivity = (activity) => {
    setActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((a) => a !== activity)
        : [...prev, activity]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-3 tracking-tight">
          Tell us your travel preferences
        </h1>
        <p className="text-gray-500 text-lg mb-16">
          Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
        </p>
        <form onSubmit={handleSubmit} className="space-y-16">
          {/* Destination */}
          <div className="group">
            <label className="block text-gray-900 text-xl font-medium mb-6">
              What is destination of choice?
            </label>
            <div className="relative">
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Enter your destination"
                className="w-full p-4 border-b-2 border-gray-100 focus:border-black text-lg bg-transparent focus:outline-none transition-colors duration-300 placeholder-gray-300"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-transform duration-300 group-hover:translate-y-[-45%]">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          <hr className="border-gray-300 my-8" />

          {/* Travel Date */}
          <div>
            <label className="block text-gray-900 text-xl font-medium mb-6">
              When are you planning to travel?
            </label>
            <input
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full p-4 border-b-2 border-gray-100 focus:border-black text-lg bg-transparent focus:outline-none transition-colors duration-300"
            />
          </div>
          <hr className="border-gray-300 my-8" />

          {/* Number of Days */}
          <div>
            <label className="block text-gray-900 text-xl font-medium mb-6">
              How many days are you planning to stay?
            </label>
            <input
              type="number"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              min="1"
              className="w-full p-4 border-b-2 border-gray-100 focus:border-black text-lg bg-transparent focus:outline-none transition-colors duration-300"
            />
          </div>
          <hr className="border-gray-300 my-8" />

          {/* Budget */}
          <div>
            <label className="block text-gray-900 text-xl font-medium mb-2">
              What is Your Budget?
            </label>
            <p className="text-gray-400 mb-6">
              The budget is exclusively allocated for activities and dining purposes.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { label: "Budget", value: "low", range: "$0 - $1,000" },
                { label: "Mid-Range", value: "medium", range: "$1,000 - $2,500" },
                { label: "Luxury", value: "high", range: "$2,500+" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setBudget(option.value)}
                  className={`group p-6 text-center border-b-2 transition-all duration-300 hover:-translate-y-1 ${
                    budget === option.value
                      ? "border-black text-black"
                      : "border-gray-100 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  <div className="font-medium text-lg mb-2 group-hover:text-black transition-colors">
                    {option.label}
                  </div>
                  <div className="text-sm text-gray-400 group-hover:text-gray-600 transition-colors">
                    {option.range}
                  </div>
                </button>
              ))}
            </div>
          </div>
          <hr className="border-gray-300 my-8" />

          {/* Travel Companion */}
          <div>
            <label className="block text-gray-900 text-xl font-medium mb-6">
              Who do you plan on traveling with on your next adventure?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {["Solo", "Couple", "Family", "Friends"].map((companion) => (
                <button
                  key={companion.toLowerCase()}
                  type="button"
                  onClick={() => setTravelCompanion(companion.toLowerCase())}
                  className={`p-6 text-center border-b-2 transition-all duration-300 hover:-translate-y-1 ${
                    travelCompanion === companion.toLowerCase()
                      ? "border-black text-black"
                      : "border-gray-100 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  <span className="text-lg">{companion}</span>
                </button>
              ))}
            </div>
          </div>
          <hr className="border-gray-300 my-8" />

          {/* Activities */}
          <div>
            <label className="block text-gray-900 text-xl font-medium mb-6">
              Which activities are you interested in?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                "Beaches",
                "City Tours",
                "Adventure",
                "Cultural",
                "Nature",
                "Shopping",
                "Nightlife",
                "Relaxation",
              ].map((activity) => (
                <button
                  key={activity}
                  type="button"
                  onClick={() => toggleActivity(activity.toLowerCase())}
                  className={`p-6 text-center border-b-2 transition-all duration-300 hover:-translate-y-1 ${
                    activities.includes(activity.toLowerCase())
                      ? "border-black text-black"
                      : "border-gray-100 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  <span className="text-lg">{activity}</span>
                </button>
              ))}
            </div>
          </div>
          <hr className="border-gray-300 my-8" />

          {/* Submit Button */}
          <div >
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-12 py-4 rounded-xl text-base font-medium hover:shadow-lg transition duration-300 flex items-center space-x-2"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
