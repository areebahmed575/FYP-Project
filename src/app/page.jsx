'use client'

import { useContext, useState } from "react"
import { motion } from "framer-motion"
import SearchBar from "./components/SearchBar/SearchBar"
import ExploreAndBrowseType from "./components/ExploreAndBrowseType/ExploreAndBrowseType"
import TripAndDeals from "./components/TripAndDeals/TripAndDeals"
import HolidayRentals from "./components/HolidayRentals/HolidayRentals"
import Image from "next/image"
import { SearchContext } from "./context/searchContext"

const HomePage = () => {
    const { dates, options, destination } = useContext(SearchContext)
    console.log(options)
    console.log(dates)
    console.log(destination)
    const [aiSuggestion, setAiSuggestion] = useState('')
    const generateAiSuggestion = () => {
        setAiSuggestion('AI-generated flight suggestion based on your preferences!')
    }

    return (
        <main className="min-h-screen px-[50px] py-[25px]">
            <div className="relative w-full h-screen overflow-hidden">
                <motion.div
                    className="absolute z-10 w-full h-full flex justify-center flex-col items-center gap-7"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <motion.h1
                        className="w-fit text-6xl text-white text-center font-extrabold px-5 drop-shadow-lg bg-teal-500 bg-opacity-30 rounded-2xl shadow-lg shadow-black/10 backdrop-blur-[9.5px] border border-teal-500 border-opacity-22"
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 100, delay: 1 }}
                    >
                        Discover Your Next Adventure
                    </motion.h1>
                    <motion.p
                        className="text-4xl text-white font-extrabold px-5 drop-shadow-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.5 }}
                    >
                        with
                    </motion.p>
                    <motion.p
                        className="w-fit text-6xl text-white text-center font-extrabold px-5 drop-shadow-lg bg-teal-500 bg-opacity-30 rounded-2xl shadow-lg shadow-black/10 backdrop-blur-[9.5px] border border-teal-500 border-opacity-22"
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 100, delay: 2 }}
                    >
                        AI Travel Companion
                    </motion.p>
                </motion.div>
                <div className="flex justify-between h-full">
                    {['saifulmulukLake2.jpg', 'atabadLake.jpg', 'Mountains.jpg'].map((img, index) => (
                        <motion.div
                            key={img}
                            className="imageContainer relative w-1/3 h-full"
                            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: index * 0.5 }}
                        >
                            <Image src={`/${img}`} fill className="object-cover" alt={`Scenic view ${index + 1}`} />
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="wrapper px-12 py-6">
                <SearchBar />

                <motion.h1
                    className="mt-24 mb-10 text-center text-6xl font-bold tracking-widest"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    Discover Pakistan
                </motion.h1>

                {[
                    {
                        title: "Discover The Vast Lands Of Pakistan",
                        description: "The vast lands of Pakistan encompass diverse landscapes, from the towering peaks of the Himalayas in the north to the arid deserts of Thar in the south. Rich in history and culture, the country boasts lush valleys, expansive plateaus, and vibrant cities, offering a unique blend of natural beauty and cultural heritage.",
                        image: "/skardu2.jpg"
                    },
                    {
                        title: "Discover the Magic of Pakistan's Cultural Heritage",
                        description: "The magic of Pakistan's cultural heritage lies in its rich tapestry of traditions, languages, and artistry. From the intricate designs of Mughal architecture to the vibrant festivals celebrating centuries-old customs, Pakistan's cultural legacy is a living testament to its diverse history, blending influences from South Asia, Central Asia, and beyond.",
                        image: "/art3.jpg"
                    },
                    {
                        title: "Plan Your Next Adventure",
                        description: "Plan your next adventure with our generative AI tour planner, designed to create personalized itineraries tailored to your interests. Whether you seek thrilling outdoor activities, cultural explorations, or relaxing getaways, our AI-driven tool crafts the perfect journey, ensuring a seamless and unforgettable travel experience every time.",
                        image: "/Passu-cones.jpg"
                    }
                ].map((section, index) => (
                    <motion.div
                        key={section.title}
                        className={`flex items-center gap-10 mb-24 flex-wrap ${index % 2 !== 0 ? 'flex-row-reverse' : ''}`}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <motion.div
                            className="relative h-[400px] flex-1 rounded-lg overflow-hidden"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Image src={section.image} fill className="object-cover" alt={section.title} />
                        </motion.div>
                        <div className="flex-1 flex flex-col items-center gap-5">
                            <h2 className="text-3xl font-semibold text-center">{section.title}</h2>
                            <p className="text-justify">{section.description}</p>
                        </div>
                    </motion.div>
                ))}

                <ExploreAndBrowseType />
                <TripAndDeals />
                <HolidayRentals />


                {/* <h1 className="text-[32px] font-bold">Tranding Destinations</h1>
                <p className="text-gray-400">Most popular choices for travellers</p>
                <div className="trendingContainer flex items-center justify-between flex-wrap my-[30px]">
                    <TrendingBox />
                    <TrendingBox />
                    <TrendingBox />
                    <TrendingBox />
                </div> */}
                {/* <h1 className="text-[32px] font-bold ">City Hours</h1>
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
                </div> */}

                <footer className="bg-teal-800 text-white text-center py-6 mt-16 rounded-lg">
                    <p>&copy; 2024 AI-Powered Tourism. All rights reserved.</p>
                </footer>
            </div>
        </main>
    )
}

export default HomePage