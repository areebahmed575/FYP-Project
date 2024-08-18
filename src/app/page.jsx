"use client"
import { useState } from "react"
import SearchBar from "./components/SearchBar/SearchBar"
import TrendingBox from "./components/TrendingBox/TrendingBox"
import CityBox from "./components/CityBox"
import UniquePropertyBox from "./components/UniquePropertyBox"
import Image from "next/image"

const HomePage = () => {
    const [aiSuggestion, setAiSuggestion] = useState('')
    const generateAiSuggestion = () => {
        setAiSuggestion('AI-generated flight suggestion based on your preferences!')
    }

    return (
        <main className="flex flex-col min-h-screen px-[10px] ">
            <div className="searchContainer flex justify-center rounded-xl  p-8 mb-12 items-center">
                <SearchBar />
            </div>
            <div className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-3xl font-semibold mb-6 text-gray-800">AI Flight Assistant</h2>
                    <p className="mb-6 text-gray-600">Let our AI suggest the perfect flight itinerary based on your preferences!</p>
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
                    <h2 className="text-3xl font-semibold mb-6 text-gray-800">Why Fly With Us?</h2>
                    <ul className="space-y-4 text-gray-600">
                        <li className="flex items-center">
                            <svg className="w-6 h-6 mr-2 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            AI-powered flight recommendations
                        </li>
                        <li className="flex items-center">
                            <svg className="w-6 h-6 mr-2 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            Exclusive deals with top airlines
                        </li>
                        <li className="flex items-center">
                            <svg className="w-6 h-6 mr-2 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            24/7 customer support
                        </li>
                    </ul>
                </div>
            </div>
            <h1 className="text-[32px] font-bold mt-[40px]">Tranding Destinations</h1>
            <p className="text-gray-400">Most popular choices for travellers</p>
            <div className="trendingContainer flex items-center justify-between flex-wrap my-[30px]">
                <TrendingBox />
                <TrendingBox />
                <TrendingBox />
                <TrendingBox />
            </div>
            <h1 className="text-[32px] font-bold mt-[40px]">City Hours</h1>
            <p className="text-gray-400">Most popular cities for travellers</p>
            <div className="trendingContainer flex items-center justify-between flex-wrap my-[30px]">
                {
                    ['Karachi', 'Lahore', 'Islamabad', 'Peshawar'].map((city) => (
                        <CityBox city={city} key={city}/>
                    ))
                }
            </div>
            <h1 className="text-[32px] font-bold mt-[40px]">Stay at Our Top Unique Properties</h1>
            <div className="grid md:grid-cols-2 gap-8 my-[30px]">
                {['Treehouse Getaway', 'Underwater Suite'].map((property) => (
                    <UniquePropertyBox property={property} key={property}/>
                ))}
            </div>
        </main>
    )
}

export default HomePage