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
        <main className="min-h-screen">
            
                   
              
            <div className="relative w-[100%] h-[100%]">
                <div className=" absolute z-10 w-[100%] top-8 flex justify-center flex-col items-center gap-7 h-fit mx-auto">
                    <h1 className=" w-fit text-[64px]  text-white text-center font-extrabold px-[5px] drop-shadow-lg bg-teal-500 bg-opacity-30 rounded-2xl shadow-lg shadow-black/10 backdrop-blur-[9.5px] border border-teal-500 border-opacity-22">Discover Your Next Advanture</h1>
                    <p className="text-[40px] text-white font-extrabold px-[5px] drop-shadow-lg">with</p>
                    <p className="w-fit text-[64px]  text-white text-center font-extrabold px-[5px] drop-shadow-lg bg-teal-500 bg-opacity-30 rounded-2xl shadow-lg shadow-black/10 backdrop-blur-[9.5px] border border-teal-500 border-opacity-22">AI Travel Companion</p>
                </div>
                <div className="flex justify-between">
                    <div className="imageContainer relative w-[33%] h-[90vh] ">
                        <Image src={`/saifulmulukLake2.jpg`} fill className="object-cover" />
                    </div>
                    <div className="imageContainer relative w-[33%] h-[80vh] ">
                        <Image src={`/atabadLake.jpg`} fill className="object-cover" />
                    </div>
                    <div className="imageContainer relative w-[33%] h-[90vh] ">
                        <Image src={`/Mountains.jpg`} fill className="object-cover" />
                    </div>
                </div>
                
            </div>

            

            <div className="wrapper px-[50px] py-[25px]">

            <SearchBar />
                

                <h1 className="mt-[90px] mb-[40px] text-center text-[64px] font-bold tracking-widest">Discover Pakistan</h1>
                <div className="discoverPak flex items-center gap-10 mb-[100px] flex-wrap">
                    <div className="left relative h-[400px] flex-1 rounded">
                        <Image src={`/skardu2.jpg`} fill className="object-cover rounded-lg" />
                    </div>
                    <div className="right flex-1 flex flex-col items-center gap-5">
                        <h1 className="text-[32px] font-semibold text-center">
                            Discover The Vast Lands Of Pakistan
                        </h1>
                        <p className="text-justify">
                            The vast lands of Pakistan encompass diverse landscapes, from the towering peaks of the Himalayas in the north to the arid deserts of Thar in the south. Rich in history and culture, the country boasts lush valleys, expansive plateaus, and vibrant cities, offering a unique blend of natural beauty and cultural heritage.
                        </p>
                    </div>
                </div>
                <div className="discoverPak flex items-center  gap-10 mb-[100px] flex-wrap">
                    <div className="right flex-1 flex flex-col items-center gap-5">
                        <h1 className="text-[32px] font-semibold text-center">
                            Discover the Magic of Pakistan's Cultural Heritage
                        </h1>
                        <p className="text-justify">
                            The magic of Pakistan's cultural heritage lies in its rich tapestry of traditions, languages, and artistry. From the intricate designs of Mughal architecture to the vibrant festivals celebrating centuries-old customs, Pakistan's cultural legacy is a living testament to its diverse history, blending influences from South Asia, Central Asia, and beyond.
                        </p>
                    </div>
                    <div className="left relative h-[400px] flex-1 rounded">
                        <Image src={`/art3.jpg`} fill className="object-cover rounded-lg" />
                    </div>
                </div>
                <div className="discoverPak flex items-center  gap-10 mb-[100px] flex-wrap">
                    <div className="left relative h-[400px] flex-1 rounded">
                        <Image src={`/Passu-cones.jpg`} fill className="object-cover rounded-lg" />
                    </div>
                    <div className="right flex-1 flex flex-col items-center gap-5">
                        <h1 className="text-[32px] font-semibold text-center">
                            Plan Your Next Advanture
                        </h1>
                        <p className="text-justify">
                            Plan your next adventure with our generative AI tour planner, designed to create personalized itineraries tailored to your interests. Whether you seek thrilling outdoor activities, cultural explorations, or relaxing getaways, our AI-driven tool crafts the perfect journey, ensuring a seamless and unforgettable travel experience every time.
                        </p>
                    </div>
                </div>

                <h1 className="text-[32px] font-bold">Tranding Destinations</h1>
                <p className="text-gray-400">Most popular choices for travellers</p>
                <div className="trendingContainer flex items-center justify-between flex-wrap my-[30px]">
                    <TrendingBox />
                    <TrendingBox />
                    <TrendingBox />
                    <TrendingBox />
                </div>
                <h1 className="text-[32px] font-bold ">City Hours</h1>
                <p className="text-gray-400">Most popular cities for travellers</p>
                <div className="trendingContainer flex items-center justify-between flex-wrap my-[30px]">
                    {
                        ['Karachi', 'Lahore', 'Islamabad', 'Peshawar'].map((city) => (
                            <CityBox city={city} key={city} />
                        ))
                    }
                </div>
                <h1 className="text-[32px] font-bold ">Stay at Our Top Unique Properties</h1>
                <div className="grid md:grid-cols-2 gap-8 my-[30px]">
                    {['Treehouse Getaway', 'Underwater Suite'].map((property) => (
                        <UniquePropertyBox property={property} key={property} />
                    ))}
                </div>
                <footer className="bg-teal-800 text-white text-center py-6 mt-16">
                    <p>&copy; 2024 AI-Powered Tourism. All rights reserved.</p>
                </footer>
            </div>
        </main>
    )
}

export default HomePage