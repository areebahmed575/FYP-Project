'use client'
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { GiTribalMask } from 'react-icons/gi';
import { FaTheaterMasks, FaLandmark, FaQuoteLeft } from 'react-icons/fa';
import { MdOutlineFestival } from 'react-icons/md';
import { IoMdRestaurant } from 'react-icons/io';
import { GiPaintBrush } from 'react-icons/gi';

export default function CulturalExperiences() {
  const [aiGeneratedItinerary, setAiGeneratedItinerary] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const generateItinerary = async () => {
    const itinerary = "Day 1: Visit Badshahi Mosque, explore Lahore Fort\nDay 2: Experience Sufi music at Data Darbar...";
    setAiGeneratedItinerary(itinerary);
  };

  const testimonials = [
    { text: "The cultural tour of Pakistan was an eye-opening experience. The hospitality and rich traditions left me in awe.", author: "Sarah J." },
    { text: "From the bustling bazaars to the serene mountains, Pakistan's cultural diversity is truly breathtaking.", author: "Michael R." },
    { text: "The food, the music, the art - every aspect of Pakistani culture is a feast for the senses!", author: "Emma L." },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen px-[50px] py-[25px]">
      <Head>
        <title>Cultural Experiences in Pakistan</title>
        <meta name="description" content="Discover the rich cultural heritage of Pakistan" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-center mb-8 text-teal-800"
        >
          Immerse Yourself in Pakistani Culture
        </motion.h1>

        
        <section className="relative h-96 mb-16 rounded-xl overflow-hidden">
          <Image
            src="/IMG_8262-3-1-1024x768-7.webp"
            alt="Pakistani Culture"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h2 className="text-white text-4xl font-bold text-center px-4">
              Discover the Magic of Pakistan's Cultural Heritage
            </h2>
          </div>
        </section>

        
        <section className="container mx-auto my-16 px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-teal-800">Explore Our Cultural Offerings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: MdOutlineFestival, title: "Traditional Festivals", description: "Experience vibrant and colorful festivals", color: "blue" },
              { icon: FaLandmark, title: "Historical Landmarks", description: "Explore ancient forts and monuments", color: "green" },
              { icon: FaTheaterMasks, title: "Performing Arts", description: "Enjoy traditional dance and music", color: "red" },
              { icon: GiTribalMask, title: "Tribal Traditions", description: "Discover unique customs and rituals", color: "purple" },
              { icon: GiPaintBrush, title: "Art & Craft", description: "Explore rich artistic traditions", color: "orange" },
              { icon: IoMdRestaurant, title: "Culinary Heritage", description: "Savor diverse Pakistani flavors", color: "teal" },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className={`bg-white shadow-lg rounded-lg p-6 transform transition duration-300 hover:shadow-xl`}
              >
                <item.icon className={`text-6xl text-${item.color}-500 mx-auto`} />
                <h3 className="text-2xl font-bold mt-4 text-center">{item.title}</h3>
                <p className="text-gray-700 mt-2 text-center">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="bg-white py-16 rounded-xl shadow-lg my-16">
          <div className="container mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-8 text-teal-800">What Our Visitors Say</h2>
            <div className="relative h-48">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: index === activeTestimonial ? 1 : 0, x: index === activeTestimonial ? 0 : 50 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  <FaQuoteLeft className="text-4xl text-teal-500 mb-4" />
                  <p className="text-xl italic mb-4">{testimonial.text}</p>
                  <p className="font-semibold">{testimonial.author}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-teal-800">Featured Experiences</h2>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative w-full h-64">
              <Image
                src="/1501276-1546364178.jpg"
                alt="Sufi Music Performance"
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Sufi Music Experiences</h3>
              <p>Immerse yourself in the spiritual world of Sufi music at historic shrines and modern venues.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative w-full h-64">
              <Image
                src="/Bryani.webp"
                alt="Pakistani Cuisine"
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Culinary Delights</h3>
              <p>Explore the diverse flavors of Pakistani cuisine through cooking classes and food tours.</p>
            </div>
          </motion.div>
        </section>
        </section>

        
        

       
        <section className="bg-white py-16 rounded-xl shadow-lg">
          <div className="container mx-auto text-center px-4">
            <h2 className="text-4xl font-bold mb-8 text-teal-800">Gallery</h2>
            <p className="text-gray-700 mb-8">A glimpse into the cultural experiences of Pakistan</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              
              {['festival.jpg', 'landmark.jpg', 'perfromance2.jpg', 'tribal2.jpg', 'art3.jpg', 'food2.jpg'].map((img, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="relative h-64 rounded-lg overflow-hidden"
                >
                  <Image
                    src={`/${img}`}
                    alt={img.split('.')[0]}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-110"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="my-16 text-center">
          <h2 className="text-3xl font-bold mb-4 text-teal-800">Ready to Experience Pakistan's Culture?</h2>
          <p className="text-xl mb-8">Let our AI create a personalized cultural itinerary just for you!</p>
          <button
            onClick={generateItinerary}
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300"
          >
            Generate My Cultural Itinerary
          </button>
          
        </section>
      </main>
    </div>
  );
}