"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaSun, FaCloudSun, FaCloud, FaCloudRain, FaSnowflake } from "react-icons/fa";

export default function ExplorePage() {
  const [aiRecommendation, setAiRecommendation] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [destinations, setDestinations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const [activity, setActivity] = useState("");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    setDestinations([
      {
        id: 1,
        name: "Hunza Valley",
        region: "north",
        description: "Majestic mountains and ancient forts",
        image: "/hunzaValley.jpg",
      },
      {
        id: 2,
        name: "Lahore Fort",
        region: "east",
        description: "Historical marvel of Mughal architecture",
        image: "/lahoreFort.jpg",
      },
      {
        id: 3,
        name: "Makran Coast",
        region: "south",
        description: "Pristine beaches and rock formations",
        image: "/makranCoast.jpg",
      },
      {
        id: 4,
        name: "Badshahi Mosque",
        region: "east",
        description: "Iconic symbol of Lahore's heritage",
        image: "/badshahiMosque.jpg",
      },
      {
        id: 5,
        name: "Deosai Plains",
        region: "north",
        description: "Second highest plateau in the world",
        image: "/deosaiPlains.jpg",
      },
      {
        id: 6,
        name: "Mohenjo-daro",
        region: "south",
        description: "Ancient Indus Valley Civilization site",
        image: "/mohenjoDaro.jpg",
      },
    ]);
  }, []);

  const generateAiRecommendation = async () => {
    if (!searchQuery || !activity) {
      alert("Please enter both a location and an activity.");
      return;
    }

    setIsGeneratingContent(true);
    setAiRecommendation("");

    try {
      const response = await fetch("http://localhost:8000/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location: searchQuery, activity: activity }),
      });

      const data = await response.json();

      if (response.ok) {
        setAiRecommendation(data.combined_output);
        
        // setWeather({
        //   temp: Math.floor(Math.random() * 30) + 10,
        //   condition: ["Sunny", "Partly Cloudy", "Cloudy", "Rainy", "Snowy"][Math.floor(Math.random() * 5)]
        // });
      } else {
        setAiRecommendation("Sorry, could not fetch recommendations at this time.");
      }
    } catch (error) {
      console.error(error);
      setAiRecommendation("An error occurred while fetching recommendations.");
    } finally {
      setIsGeneratingContent(false);
    }
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Sunny": return <FaSun className="text-yellow-400" />;
      case "Partly Cloudy": return <FaCloudSun className="text-gray-400" />;
      case "Cloudy": return <FaCloud className="text-gray-500" />;
      case "Rainy": return <FaCloudRain className="text-blue-400" />;
      case "Snowy": return <FaSnowflake className="text-blue-200" />;
      default: return null;
    }
  };

  const filteredDestinations = destinations.filter(
    (dest) =>
      (selectedRegion === "all" || dest.region === selectedRegion) &&
      dest.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const generateDestinationContent = async (destination) => {
    setIsGeneratingContent(true);
    setSelectedDestination(destination);

    // Simulating API call to a generative AI service
    setTimeout(() => {
      setGeneratedContent(`
${destination.name} is a must-visit destination in Pakistan.
Known for its ${destination.description}, it offers visitors a unique blend of natural beauty and cultural heritage.

Top attractions:
1. ${destination.name} viewpoint
2. Local bazaar
3. Traditional food tasting experience

Best time to visit: March to May, September to November
      `);
      setIsGeneratingContent(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen md:px-[20px] lg:px-[50px] lg:py-[25px]">
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="relative h-[500px] mb-16 rounded-xl overflow-hidden">
          <Image
            src="/explorebackground.png"
            alt="Pakistan Landscape"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent flex flex-col items-start justify-center p-5 md:p-12 mb-8">
            <span className="text-white text-sm font-semibold mb-2">
              Trending Now
            </span>
            <h2 className="text-white text-3xl lg:text-6xl font-bold mb-4">
              EXPLORE PAKISTAN
            </h2>
            <p className="text-white lg:text-lg mb-6 max-w-2xl">
              Discover the beauty and diversity of Pakistan's landscapes,
              culture, and heritage. From towering mountains to historic sites,
              there's something for every traveler.
            </p>
            <button className="bg-white text-black py-2 px-6 rounded-full font-semibold hover:bg-opacity-90 transition duration-300">
              See all →
            </button>
          </div>
          <div className="absolute bottom-8 right-8">
            <div className="hidden md:flex space-x-4">
              {["Islamabad", "Quetta", "Gilgit"].map((city) => (
                <div
                  key={city}
                  className="w-32 h-36 bg-white rounded-lg overflow-hidden shadow-lg"
                >
                  <div className="h-full relative">
                    <Image
                      src={`/${city.toLowerCase()}.jpeg`}
                      alt={city}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="hidden md:flex space-x-4 mt-2">
              {["Islamabad", "Quetta", "Gilgit"].map((city) => (
                <p
                  key={city}
                  className="text-center text-sm font-semibold w-32 text-white"
                >
                  {city}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* AI Weather-Based Activity Recommender */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 bg-white rounded-xl shadow-2xl p-8 overflow-hidden"
        >
          <h2 className="text-xl lg:text-3xl font-semibold mb-6 text-gray-700">
            AI Weather-Based Activity Recommender
          </h2>
          <p className="mb-6 text-gray-600">
            Let our AI suggest the perfect activities based on real-time weather conditions!
          </p>
          <div className="flex flex-wrap gap-4 mb-6">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              placeholder="Enter your location (e.g., Islamabad, Karachi)"
              className="flex-grow p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-teal-300 transition duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              placeholder="Enter an activity (e.g., hiking, sightseeing)"
              className="flex-grow p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-teal-300 transition duration-300"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={generateAiRecommendation}
              className="bg-teal-600 text-white py-3 px-8 rounded-lg hover:bg-teal-700 transition duration-300  md:text-lg font-semibold shadow-md"
              disabled={isGeneratingContent}
            >
              {isGeneratingContent ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </span>
              ) : "Get AI Recommendations"}
            </motion.button>
          </div>
          {weather && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-blue-100 to-teal-100 p-4 rounded-lg mb-6 flex items-center justify-between"
            >
              <div className="flex items-center">
                <span className="text-4xl mr-4">{getWeatherIcon(weather.condition)}</span>
                <div>
                  <p className="font-semibold text-lg">{weather.condition}</p>
                  <p className="text-sm text-gray-600">{searchQuery}</p>
                </div>
              </div>
              <p className="text-3xl font-bold">{weather.temp}°C</p>
            </motion.div>
          )} 
          {aiRecommendation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-teal-50 border border-teal-200 p-6 rounded-lg animate-fade-in shadow-inner"
            >
              <h3 className="text-xl font-semibold mb-3 text-teal-700">AI Recommendations</h3>
              <p className="text-gray-800 whitespace-pre-line leading-relaxed">{aiRecommendation}</p>
            </motion.div>
          )}
        </motion.section>

        {/* Explore by Region */}
        <section className="mb-12">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-6 text-gray-800">
            Explore by Region
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {["all", "north", "south", "east", "west"].map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-6 py-2 rounded-full text-lg font-semibold transition duration-300 ${selectedRegion === region
                    ? "bg-teal-600 text-white"
                    : "bg-white text-teal-600 hover:bg-teal-100"
                  }`}
              >
                {region.charAt(0).toUpperCase() + region.slice(1)}
              </button>
            ))}
          </div>
        </section>

        {/* Discover Amazing Places */}
        <section className="mb-16">
          <h2 className="text-2xl lg:text-4xl font-semibold mb-8 text-gray-800">
            Discover Amazing Places
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((dest) => (
              <div
                key={dest.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
              >
                <Image
                  src={dest.image}
                  alt={dest.name}
                  width={400}
                  height={300}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-700">
                    {dest.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{dest.description}</p>
                  <button
                    onClick={() => generateDestinationContent(dest)}
                    className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition duration-300"
                  >
                    Explore More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Generated Destination Content */}
        {selectedDestination && (
          <section className="mb-16 bg-white rounded-xl shadow-2xl p-8">
            <h2 className="text-2xl lg:text-3xl font-semibold mb-6 text-gray-700">
              Discover {selectedDestination.name}
            </h2>
            {isGeneratingContent ? (
              <p className="text-gray-600">Generating content...</p>
            ) : (
              <div className="prose max-w-none">
                <pre className="whitespace-pre-wrap text-gray-800">
                  {generatedContent}
                </pre>
              </div>
            )}
          </section>
        )}

        {/* Travel Insights */}
        <section>
          <h2 className="text-2xl lg:text-4xl font-semibold mb-8 text-gray-800">
            Travel Insights
          </h2>
          <div className="bg-white rounded-xl shadow-lg p-3 md:p-8">
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 mr-2 text-teal-500 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <p>
                  <span className="font-semibold">Best time to visit:</span>{" "}
                  March to November for most regions, avoiding extreme summer
                  heat and winter cold.
                </p>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 mr-2 text-teal-500 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <p>
                  <span className="font-semibold">Local customs:</span> Respect
                  local dress codes, especially when visiting religious sites.
                </p>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 mr-2 text-teal-500 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <p>
                  <span className="font-semibold">Must-try foods:</span> Don't
                  miss out on trying biryani, nihari, and the variety of local
                  street foods.
                </p>
              </li>
            </ul>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-teal-800 text-white text-center py-6 mt-16">
        <p>&copy; 2024 AI-Powered Tourism. All rights reserved.</p>
      </footer>
    </div>
  );
}
