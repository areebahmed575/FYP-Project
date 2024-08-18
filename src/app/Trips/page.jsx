"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function TripPage() {
  const [aiSuggestion, setAiSuggestion] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [trips, setTrips] = useState([])

  useEffect(() => {
    
    setTrips([
      { id: 1, name: 'Hunza Valley Adventure', category: 'adventure', duration: '7 days', price: 'Rs999', image: '/hunzaValley2.jpg' },
      { id: 2, name: 'Lahore Cultural Tour', category: 'culture', duration: '5 days', price: 'Rs799', image: '/hunzaValley2.jpg' },
      { id: 3, name: 'Coastal Retreat Karachi', category: 'relaxation', duration: '4 days', price: 'Rs699', image: '/hunzaValley2.jpg' },
      { id: 4, name: 'Islamabad City Exploration', category: 'urban', duration: '3 days', price: 'Rs599', image: '/hunzaValley2.jpg' },
      { id: 5, name: 'Shalimar Gardens Getaway', category: 'culture', duration: '2 days', price: 'Rs399', image: '/hunzaValley2.jpg' },
      { id: 6, name: 'Makran Coast Beach Trip', category: 'relaxation', duration: '6 days', price: 'Rs899', image: '/hunzaValley2.jpg' },
    ])
  }, [])

  const generateAiSuggestion = () => {
    setAiSuggestion('Based on your preferences, we recommend the Hunza Valley Adventure for an unforgettable experience!')
  }

  const filteredTrips = selectedCategory === 'all' ? trips : trips.filter(trip => trip.category === selectedCategory)

  return (
    <div className="min-h-screen ">
      <main className="container mx-auto px-4 py-12">
        
        <section className="relative h-96 mb-16 rounded-xl overflow-hidden">
          <Image
            src="/Arang_Kel.jpg"
            alt="Pakistani Culture"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h2 className="text-white text-4xl font-bold text-center px-4">
            Discover Your Perfect Trip
            </h2>
          </div>
        </section>
        
        <section className="mb-16 bg-white rounded-xl shadow-2xl p-8">
          <h2 className="text-3xl font-semibold mb-6 text-gray-700">AI Trip Planner</h2>
          <p className="mb-6 text-gray-600">Let our AI suggest the perfect trip based on your preferences!</p>
          <div className="flex flex-wrap gap-4 mb-6">
            <input type="text" placeholder="Interests" className="flex-grow p-2 border rounded" />
            <input type="text" placeholder="Budget" className="flex-grow p-2 border rounded" />
            <input type="text" placeholder="Duration" className="flex-grow p-2 border rounded" />
          </div>
          <button
            onClick={generateAiSuggestion}
            className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition duration-300 text-lg font-semibold mb-6"
          >
            Generate AI Suggestion
          </button>
          {aiSuggestion && (
            <div className="bg-teal-50 border border-teal-200 p-4 rounded-lg animate-fade-in">
              <p className="text-teal-800">{aiSuggestion}</p>
            </div>
          )}
        </section>

        
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Explore Trip Categories</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {['all', 'adventure', 'culture', 'relaxation', 'urban'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-lg font-semibold transition duration-300 ${
                  selectedCategory === category
                    ? 'bg-teal-600 text-white'
                    : 'bg-white text-teal-600 hover:bg-orange-100'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </section>

        
        <section className="mb-16">
          <h2 className="text-4xl font-semibold mb-8 text-gray-800">Featured Trips</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {filteredTrips.map((trip) => (
              <div key={trip.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
                <Image
                  src={trip.image}
                  alt={trip.name}
                  width={400}
                  height={300}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-700">{trip.name}</h3>
                  <p className="text-gray-600 mb-2">{trip.duration}</p>
                  <p className="text-2xl font-bold text-gray-600 mb-4">{trip.price}</p>
                  <button className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition duration-300">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        
        <section>
          <h2 className="text-4xl font-semibold mb-8 text-gray-800">Trip Planning Tips</h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <svg className="w-6 h-6 mr-2 text-teal-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                <p><span className="font-semibold">Plan ahead:</span> Book your trips and accommodations in advance for better deals and availability.</p>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 mr-2 text-teal-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                <p><span className="font-semibold">Pack smart:</span> Check the weather and pack appropriate clothing and essentials for your destination.</p>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 mr-2 text-teal-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                <p><span className="font-semibold">Be flexible:</span> Leave some room in your itinerary for spontaneous adventures and local recommendations.</p>
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


