"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function ExplorePage() {
  const [aiRecommendation, setAiRecommendation] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [destinations, setDestinations] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
   
    setDestinations([
      { id: 1, name: 'Hunza Valley', region: 'north', description: 'Majestic mountains and ancient forts', image: '/hunzaValley.jpg' },
      { id: 2, name: 'Lahore Fort', region: 'east', description: 'Historical marvel of Mughal architecture', image: '/hunzaValley.jpg' },
      { id: 3, name: 'Makran Coast', region: 'south', description: 'Pristine beaches and rock formations', image: '/hunzaValley.jpg' },
      { id: 4, name: 'Badshahi Mosque', region: 'east', description: 'Iconic symbol of Lahore\'s heritage', image: '/hunzaValley.jpg' },
      { id: 5, name: 'Deosai Plains', region: 'north', description: 'Second highest plateau in the world', image: '/hunzaValley.jpg' },
      { id: 6, name: 'Mohenjo-daro', region: 'south', description: 'Ancient Indus Valley Civilization site', image: '/hunzaValley.jpg' },
    ])
  }, [])

  const generateAiRecommendation = () => {
    setAiRecommendation('Based on your interests, we recommend exploring the breathtaking Hunza Valley for its natural beauty and rich culture!')
  }

  const filteredDestinations = destinations.filter(dest => 
    (selectedRegion === 'all' || dest.region === selectedRegion) &&
    dest.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen px-[50px] py-[25px]">
      <main className="container mx-auto px-4 py-12">
       
        <section className="relative h-96 mb-16 rounded-xl overflow-hidden">
          <Image
            src="/Passu-cones-Hunza.jpg"
            alt="Pakistani Culture"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h2 className="text-white text-4xl font-bold text-center px-4">
            Explore Pakistan
            </h2>
          </div>
        </section>

       
        <section className="mb-16 bg-white rounded-xl shadow-2xl p-8">
          <h2 className="text-3xl font-semibold mb-6 text-gray-700">AI Travel Recommender</h2>
          <p className="mb-6 text-gray-600">Let our AI suggest the perfect destination based on your interests!</p>
          <div className="flex flex-wrap gap-4 mb-6">
            <input 
              type="text" 
              placeholder="Your interests (e.g., nature, history, adventure)" 
              className="flex-grow p-2 border rounded"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              onClick={generateAiRecommendation}
              className="bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-700 transition duration-300 text-lg font-semibold"
            >
              Get AI Recommendation
            </button>
          </div>
          {aiRecommendation && (
            <div className="bg-teal-50 border border-teal-200 p-4 rounded-lg animate-fade-in">
              <p className="text-gray-800">{aiRecommendation}</p>
            </div>
          )}
        </section>

        
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Explore by Region</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {['all', 'north', 'south', 'east', 'west'].map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-6 py-2 rounded-full text-lg font-semibold transition duration-300 ${
                  selectedRegion === region
                    ? 'bg-teal-600 text-white'
                    : 'bg-white text-teal-600 hover:bg-teal-100'
                }`}
              >
                {region.charAt(0).toUpperCase() + region.slice(1)}
              </button>
            ))}
          </div>
        </section>

        
        <section className="mb-16">
          <h2 className="text-4xl font-semibold mb-8 text-gray-800">Discover Amazing Places</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {filteredDestinations.map((dest) => (
              <div key={dest.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  width={400}
                  height={300}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-700">{dest.name}</h3>
                  <p className="text-gray-600 mb-4">{dest.description}</p>
                  <button className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition duration-300">
                    Explore More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        
        <section>
          <h2 className="text-4xl font-semibold mb-8 text-gray-800">Travel Insights</h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <svg className="w-6 h-6 mr-2 text-teal-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <p><span className="font-semibold">Best time to visit:</span> March to November for most regions, avoiding extreme summer heat and winter cold.</p>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 mr-2 text-teal-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <p><span className="font-semibold">Local customs:</span> Respect local dress codes, especially when visiting religious sites.</p>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 mr-2 text-teal-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <p><span className="font-semibold">Must-try foods:</span> Don't miss out on trying biryani, nihari, and the variety of local street foods.</p>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="bg-teal-800 text-white text-center py-6 mt-16">
        <p>&copy; 2024 AI-Powered Tourism. All rights reserved.</p>
      </footer>
    </div>
  )
}