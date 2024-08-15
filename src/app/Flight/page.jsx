"use client"

import { useState } from 'react'
import Image from 'next/image'
import SearchBar from '../components/SearchBar/SearchBar'

export default function FlightPage() {
  const [aiSuggestion, setAiSuggestion] = useState('')
  const [selectedTab, setSelectedTab] = useState('round-trip')

  const generateAiSuggestion = () => {
    setAiSuggestion('AI-generated flight suggestion based on your preferences!')
  }

  
  
  const weekendDeals = [
    { destination: 'Hunza Valley, Gilgit-Baltistan', price: '$199', savings: '30%' },
    { destination: 'Shalimar Gardens, Lahore', price: '$149', savings: '25%' },
    { destination: 'Badshahi Mosque, Lahore', price: '$179', savings: '20%' },
    { destination: 'Makran Coast, Balochistan', price: '$229', savings: '15%' },
  ]


  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-white">
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-gray-800">Find Your Perfect Flight</h1>

       
        <div className="bg-white rounded-xl shadow-2xl p-8 mb-12 flex justify-center items-center">
          <SearchBar />
        </div>
     
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">AI Flight Assistant</h2>
            <p className="mb-6 text-gray-600">Let our AI suggest the perfect flight itinerary based on your preferences!</p>
            <button
              onClick={generateAiSuggestion}
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition duration-300 text-lg font-semibold mb-6"
            >
              Generate AI Suggestion
            </button>
            {aiSuggestion && (
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg animate-fade-in">
                <p className="text-gray-600">{aiSuggestion}</p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">Why Fly With Us?</h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center">
                <svg className="w-6 h-6 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                AI-powered flight recommendations
              </li>
              <li className="flex items-center">
                <svg className="w-6 h-6 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Exclusive deals with top airlines
              </li>
              <li className="flex items-center">
                <svg className="w-6 h-6 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                24/7 customer support
              </li>
            </ul>
          </div>
        </div>

        
        <section className="mb-16">
          <h2 className="text-4xl font-semibold mb-8 text-gray-800">Popular Destinations</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {['Karachi', 'Lahore', 'Islamabad', 'Dubai'].map((city) => (
              <div key={city} className="relative rounded-lg overflow-hidden group">
                <Image
                  src={`/hunzaValley2.jpg`}
                  alt={city}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-xl font-bold">{city}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        
        <section className="mb-16">
          <h2 className="text-4xl font-semibold mb-8 text-gray-800">Special Offers</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {['Summer Sale', 'Business Class Upgrade', 'Family Package'].map((offer) => (
              <div key={offer} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <Image
                  src={`/hunzaValley2.jpg`}
                  alt={offer}
                  width={400}
                  height={200}
                  className="w-full h-40 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-700">{offer}</h3>
                  <p className="text-gray-600 mb-4">Limited time offer. Book now and save!</p>
                  <button className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition duration-300">
                    View Offer
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>


        <section className="mb-16">
          <h2 className="text-4xl font-semibold mb-8 text-gray-800">Deals for the Weekend</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {weekendDeals.map((deal, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
                <Image
                  src={`/hunzaValley2.jpg`}  
                  alt={deal.destination}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 text-gray-700">{deal.destination}</h3>
                  <p className="text-gray-600 mb-2">Weekend Getaway</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-600">{deal.price}</span>
                    <span className="text-sm font-semibold text-gray-500">Save {deal.savings}</span>
                  </div>
                  <button className="mt-4 w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition duration-300 text-sm font-semibold">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>


        
        <section>
          <h2 className="text-4xl font-semibold mb-8 text-gray-800">Flight Tips</h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <svg className="w-6 h-6 mr-2 text-orange-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <p><span className="font-semibold">Book in advance:</span> Generally, booking 6-8 weeks before your trip can help you find better deals.</p>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 mr-2 text-orange-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <p><span className="font-semibold">Be flexible:</span> Consider flying on weekdays or during off-peak seasons for better prices.</p>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 mr-2 text-orange-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <p><span className="font-semibold">Compare options:</span> Don't forget to check alternative airports and consider layovers for potential savings.</p>
              </li>
            </ul>
          </div>
        </section>

        
      <footer className="bg-orange-800 text-white text-center py-6 mt-16">
        <p>&copy; 2024 AI-Powered Tourism. All rights reserved.</p>
      </footer>
    </div>
  )
}