'use client'
import React, { useState } from "react";
import { FiMapPin, FiCalendar, FiClock, FiDollarSign, FiUsers, FiActivity } from "react-icons/fi";
import TripResults from "../components/TripResults/TripResults";

export default function Page() {
  const [destination, setDestination] = useState("Enter destination(s) (e.g., Skardu, Hunza)");
  const [travelDate, setTravelDate] = useState("");
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState("low");
  const [travelCompanion, setTravelCompanion] = useState("solo");
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tripData, setTripData] = useState(null);

  const budgetAmounts = {
    low: 10000,
    medium: 25000,
    high: 50000
  };

  const companionCounts = {
    solo: 1,
    couple: 2,
    family: 4,
    friends: 3
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/plan_trip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          budget: budgetAmounts[budget],
          interests: activities,
          companions: companionCounts[travelCompanion],
          city: destination,
          days: days,
          travel_date: travelDate,
          initial_message: `Plan my trip to ${destination}`
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate itinerary');
      }

      const data = await response.json();
      const tripContent = data.assistant?.messages?.[0]?.content;

      let parsedTripData = null;
      try {
        const jsonMatch = tripContent.match(/```json\n([\s\S]*?)\n```/);
        if (jsonMatch) {
          parsedTripData = JSON.parse(jsonMatch[1]);
          console.log(parsedTripData, "parsedTripData")
        } else {
          throw new Error('No JSON data found in response');
        }
      } catch (parseError) {
        throw new Error('Invalid trip data format');
      }

      setTripData(parsedTripData);
    } catch (error) {
      alert('Failed to generate itinerary. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleActivity = (activity) => {
    setActivities(prev =>
      prev.includes(activity)
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-2xl shadow-2xl text-center">
          <div className="w-16 h-16 border-4 border-t-teal-500 border-b-teal-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 font-medium">Creating your dream journey...</p>
          <p className="text-sm text-gray-400 mt-2">Crafting the perfect itinerary for you</p>
        </div>
      </div>
    );
  }

  if (tripData) {
    return <TripResults tripData={tripData} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-teal-50">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-500">
            Design Your Journey
          </h1>
          <p className="text-gray-500 text-xl">
            Let us craft your perfect adventure with a personalized itinerary.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-16 bg-white rounded-3xl p-8 shadow-xl">
          {/* Destination */}
          <div className="group relative">
            <div className="flex items-center gap-3 mb-6">
              <FiMapPin className="w-6 h-6 text-teal-500" />
              <label className="text-gray-900 text-xl font-medium">
                Destination
              </label>
            </div>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onFocus={() => destination === "Enter destination(s) (e.g., Skardu, Hunza)" && setDestination("")}
              className="w-full p-4 border-2 border-gray-100 rounded-xl focus:border-teal-500 text-lg bg-transparent focus:outline-none transition-colors duration-300 placeholder-gray-300"
            />
          </div>

          {/* Travel Date */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <FiCalendar className="w-6 h-6 text-teal-500" />
              <label className="text-gray-900 text-xl font-medium">
                Travel Date
              </label>
            </div>
            <input
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full p-4 border-2 border-gray-100 rounded-xl focus:border-teal-500 text-lg bg-transparent focus:outline-none transition-colors duration-300"
            />
          </div>

          {/* Duration */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <FiClock className="w-6 h-6 text-teal-500" />
              <label className="text-gray-900 text-xl font-medium">
                Duration
              </label>
            </div>
            <input
              type="number"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              min="1"
              className="w-full p-4 border-2 border-gray-100 rounded-xl focus:border-teal-500 text-lg bg-transparent focus:outline-none transition-colors duration-300"
            />
          </div>

          {/* Budget */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <FiDollarSign className="w-6 h-6 text-teal-500" />
              <label className="text-gray-900 text-xl font-medium">
                Budget Level
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Budget", value: "low", range: "$0 - $1,000" },
                { label: "Mid-Range", value: "medium", range: "$1,000 - $2,500" },
                { label: "Luxury", value: "high", range: "$2,500+" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setBudget(option.value)}
                  className={`group p-6 rounded-xl text-center transition-all duration-300 hover:scale-105 ${
                    budget === option.value
                      ? "bg-teal-500 text-white shadow-lg shadow-teal-200"
                      : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <div className="font-medium text-lg mb-2">{option.label}</div>
                  <div className="text-sm opacity-80">{option.range}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Travel Companion */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <FiUsers className="w-6 h-6 text-teal-500" />
              <label className="text-gray-900 text-xl font-medium">
                Travel Companions
              </label>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {["Solo", "Couple", "Family", "Friends"].map((companion) => (
                <button
                  key={companion.toLowerCase()}
                  type="button"
                  onClick={() => setTravelCompanion(companion.toLowerCase())}
                  className={`p-6 rounded-xl text-center transition-all duration-300 hover:scale-105 ${
                    travelCompanion === companion.toLowerCase()
                      ? "bg-teal-500 text-white shadow-lg shadow-teal-200"
                      : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-lg">{companion}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Activities */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <FiActivity className="w-6 h-6 text-teal-500" />
              <label className="text-gray-900 text-xl font-medium">
                Preferred Activities
              </label>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
                  className={`p-6 rounded-xl text-center transition-all duration-300 hover:scale-105 ${
                    activities.includes(activity.toLowerCase())
                      ? "bg-teal-500 text-white shadow-lg shadow-teal-200"
                      : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-lg">{activity}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white px-8 py-4 rounded-xl font-medium hover:opacity-90 transition duration-300 transform hover:scale-[1.02] shadow-xl"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Your Journey...' : 'Design My Perfect Trip'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
