"use client"

import Image from 'next/image'
import { useState } from 'react'
import SearchBar from '../components/SearchBar/SearchBar'
import UniquePropertyBox from '../components/UniquePropertyBox'

export default function StayPage() {
  const [aiSuggestion, setAiSuggestion] = useState('')

  const generateAiSuggestion = () => {
    setAiSuggestion('AI-generated suggestion for your perfect stay!')
  }

  return (
    <div className="min-h-screen ">
      <main className="container mx-auto px-4 py-12">
       

        <div className="bg-white rounded-xl shadow-2xl p-8 mb-12 flex justify-center items-center">
          <SearchBar />
        </div>

        <section className="relative h-96 mb-16 rounded-xl overflow-hidden">
          <Image
            src="/Shangrila.jpg"
            alt="Pakistani Culture"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h2 className="text-white text-4xl font-bold text-center px-4">
            Find Your Perfect Stay
            </h2>
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">AI Travel Assistant</h2>
            <p className="mb-6 text-gray-600">Let our AI suggest the perfect stay for you! Get tailored recommendations that match your preferences and budget.</p>
            <button
              onClick={generateAiSuggestion}
              className="w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 transition duration-300 text-lg font-semibold mb-6"
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
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">Why Choose Us?</h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center">
                <svg className="w-6 h-6 mr-2 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                AI-powered recommendations for personalized stays
              </li>
              <li className="flex items-center">
                <svg className="w-6 h-6 mr-2 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Curated selection of top-rated accommodations
              </li>
              <li className="flex items-center">
                <svg className="w-6 h-6 mr-2 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                24/7 customer support to assist you anytime
              </li>
            </ul>
          </div>
        </div>
        <section className="mb-16">
          <h2 className="text-4xl font-semibold mb-8 text-gray-800">Explore Pakistan</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {['Karachi', 'Lahore', 'Islamabad', 'Peshawar'].map((city) => (
              <div key={city} className="relative rounded-lg overflow-hidden group">
                <Image
                  src={`/hunzaValley.jpg`}
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
          <h2 className="text-4xl font-semibold mb-8 text-gray-800">Browse by Property Type</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {['Hotels', 'Apartments', 'Resorts', 'Villas'].map((type) => (
              <div key={type} className="bg-white rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-shadow duration-300">
                <Image
                  src={`/${type.toLowerCase()}-icon.svg`}
                  alt={type}
                  width={64}
                  height={64}
                  className="mx-auto mb-4"
                />
                <p className="text-lg font-semibold text-gray-700">{type}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-4xl font-semibold mb-8 text-gray-800">Book a Highly Rated Holiday Rental</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {['Mountain Retreat', 'Beachfront Villa', 'City Apartment'].map((rental) => (
              <div key={rental} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <Image
                  src={`/hunzaValley.jpg`}
                  alt={rental}
                  width={400}
                  height={300}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-700">{rental}</h3>
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-500 mr-1">★★★★★</span>
                    <span className="text-gray-600">(4.9)</span>
                  </div>
                  <p className="text-gray-600">Exceptional comfort and views</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-4xl font-semibold mb-8 text-gray-800">Stay at Our Top Unique Properties</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {['Treehouse Getaway', 'Underwater Suite'].map((property) => (
              <UniquePropertyBox property={property}/>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-semibold mb-8 text-gray-800">Featured Accommodations</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
                <Image
                  src={`/hunzaValley.jpg`}
                  alt="Accommodation"
                  width={400}
                  height={300}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-2 text-gray-700">Luxury Suite</h3>
                  <p className="text-gray-600 mb-2">Skardu, Upper Kachura Lake</p>
                  <p className="text-2xl font-bold text-gray-700">Rs299/night</p>
                  <button className="mt-4 w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition duration-300">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-teal-800 text-white text-center py-6 mt-16">
        <p>&copy; 2024 AI-Powered Tourism. All rights reserved.</p>
      </footer>
    </div>
  )
}
