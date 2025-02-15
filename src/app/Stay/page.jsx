"use client"

import Image from 'next/image'
import { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar/SearchBar'
import UniquePropertyBox from '../components/UniquePropertyBox'
import Link from 'next/link'
import { useAppSelector } from '../../lib/store/hooks'
import { motion } from 'framer-motion';
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useRouter } from 'next/navigation'
import RentalCard from '../components/RentalCard/RentalCard'

const FormModal = ({ type, setOpenModal, dates }) => {
  const [value, setValue] = useState('')
  const [valueError, setValueError] = useState('')
  const { startDate, endDate } = dates
  const router = useRouter()

  const routeHandler = () => {
    // console.log(value)
    // console.log('Hello')
    if (value === '') {
      setValueError('Enter the destination');
      return
    } else {
      router.push(`/PropertyListing/${value}?arrival_date=${startDate}&departure_date=${endDate}&categories_filter=${type === 'Hotels' ? 'property_type::204' : type === 'Apartments' ? 'property_type::201' : type === 'Resorts' ? 'property_type::206' : type === 'Villas' ? 'property_type::213' : 'property_type::204'}`)
    }
  }

  return (
    <div className='bg-white rounded-lg shadow-md p-4 text-center transition-shadow duration-300'>
      <div className='flex items-end justify-end py-[10px]'>
        <IoIosCloseCircleOutline size={25} color='teal' className='cursor-pointer' onClick={() => setOpenModal(false)} />
      </div>
      <div className="inputs flex flex-col items-center justify-center gap-[15px]">
        <input type="text" placeholder='Enter Destination' className='w-[300px] py-[5px] px-[10px] rounded bg-white border-teal-500 border-[2px] outline-teal-700 placeholder:text-theme-black' onChange={(e) => setValue(e.target.value)} />
        <p className='mr-1'>Property Type: {type}</p>
        <motion.button whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }} className='' onClick={routeHandler}>
          <span className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 flex items-center justify-center space-x-2">Search</span>
        </motion.button>
      </div>
    </div>
  )
}

export default function StayPage() {
  const [aiSuggestion, setAiSuggestion] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [type, setType] = useState('')
  const { dates } = useAppSelector(state => state.search)
  const { startDate, endDate } = dates
  const [highlyRatedHotel, setHighlyRatedHotel] = useState([]);
  const [uniqueProperties, setUniqueProperties] = useState([]);
  // console.log(startDate)

  const explore = [
    {
      name: 'Karachi',
      img: '/karachi.jpg'
    },
    {
      name: 'Lahore',
      img: '/lahore.jpg'
    },
    {
      name: 'Islamabad',
      img: '/islamabad.jpg'
    },
    {
      name: 'Peshawar',
      img: '/peshawar.webp'
    }
  ]

  const property = [
    {
      name: 'Hotels',
      img: '/hotels.jpg'
    },
    {
      name: 'Apartments',
      img: '/apartments.jpg'
    },
    {
      name: 'Resorts',
      img: '/resorts.webp'
    },
    {
      name: 'Villas',
      img: '/villas.jpg'
    }
  ]

  const highlyRatedHotels = async (dest_id, arrival_date, departure_date) => {
    try {
      const url = `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels?dest_id=${dest_id}&search_type=CITY&arrival_date=${arrival_date}&departure_date=${departure_date}&sort_by=class_descending&categories_filter=hotels`; //&adults=1&children_age=0%2C17&room_qty=1&page_number=1&units=metric&temperature_unit=c&languagecode=en-us&currency_code=AED (optional)
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
          'x-rapidapi-host': process.env.NEXT_PUBLIC_RAPIDAPI_HOST
        },
        // next: { revalidate: 86400 }
      };

      const res = await fetch(url, options);
      if (!res.ok) {
        throw new Error("Something went wrong!!")
      }
      const data = await res.json();
      // console.log(data.data.hotels.slice(0, 4))
      setHighlyRatedHotel(data.data.hotels.slice(0, 4))
    } catch (error) {
      setError(error.message)
    }
  }

  const getUniqueProperty = async (dest_id, arrival_date, departure_date, propertyFilter) => {
    try {
      const url = `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels?dest_id=${dest_id}&search_type=CITY&arrival_date=${arrival_date}&departure_date=${departure_date}&adults=1&children_age=0%2C17&categories_filter=${propertyFilter}`; //&adults=1&children_age=0%2C17&room_qty=1&page_number=1&units=metric&temperature_unit=c&languagecode=en-us&currency_code=AED (optional)
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
          'x-rapidapi-host': process.env.NEXT_PUBLIC_RAPIDAPI_HOST
        },
        // next: { revalidate: 86400 }
      };

      const res = await fetch(url, options);
      if (!res.ok) {
        throw new Error("Something went wrong!!")
      }
      const data = await res.json();
      return data.data.hotels[0]
    } catch (error) {
      setError(error.message)
    }
  }

  const uniquePropertyHandler = async () => {
    const property1 = await getUniqueProperty("-2771255", startDate, endDate, 'property_type::224')
    const property2 = await getUniqueProperty("-2771255", startDate, endDate, 'property_type::206')
    const property3 = await getUniqueProperty("-2770324", startDate, endDate, 'property_type::221')
    const property4 = await getUniqueProperty("-2770324", startDate, endDate, 'property_type::213')

    // console.log(property1)
    // console.log(property2)
    // console.log(property3)
    // console.log(property4)

    if (property1 && property2) {
      setUniqueProperties([property1, property2, property3, property4])
    } else {
      return
    }
  }

  const generateAiSuggestion = () => {
    setAiSuggestion('AI-generated suggestion for your perfect stay!')
  }

  useEffect(() => {
    highlyRatedHotels("900055706", startDate, endDate);
    uniquePropertyHandler()
  }, [startDate, endDate])

  return (
    <div className="min-h-screen md:px-[20px] lg:px-[50px] lg:py-[25px]">
      <main className="container mx-auto px-4 py-12">
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

        <div >
          <SearchBar />
        </div>

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
          <h2 className="text-2xl lg:text-4xl font-semibold mb-8 text-gray-800">Explore Pakistan</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {explore.map((city) => (
              <Link href={`/PropertyListing/${city.name}?arrival_date=${startDate}&departure_date=${endDate}`} key={city.name} className="relative rounded-lg overflow-hidden group">
                <Image
                  src={`${city?.img}`}
                  alt={city}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-xl font-bold">{city.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-16 relative">
          <h2 className="text-2xl lg:text-4xl font-semibold mb-8 text-gray-800">Browse by Property Type</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {property.map((type) => (
              <div key={type.name} className="bg-white rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300 cursor-pointer" onClick={() => {
                setOpenModal(true)
                setType(type.name)
              }}>
                <Image
                  src={type.img}
                  alt={type.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <p className="text-lg font-semibold text-gray-700 mb-2">{type.name}</p>
              </div>
            ))}
            {
              openModal && (
                <div className=''>
                  <FormModal type={type} setOpenModal={setOpenModal} dates={dates} />
                </div>
              )
            }
          </div>
        </section>


        <section className="mb-16">
          <h2 className="text-2xl lg:text-4xl font-semibold mb-8 text-gray-800">Book a Highly Rated Holiday Rental in Swat</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {/* {console.log(highlyRatedHotel)} */}
            {highlyRatedHotel.map((hotel) => (
              <RentalCard key={hotel.hotel_id} rental={hotel} dates={[startDate, endDate]} />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl lg:text-4xl font-semibold mb-8 text-gray-800">Stay at Our Top Unique Properties</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {uniqueProperties.map((property) => (
              <RentalCard key={property.hotel_id} rental={property} dates={[startDate, endDate]} isUnique={true} />
            ))}
          </div>
        </section>

        {/* <section>
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
        </section> */}
      </main>

      <footer className="bg-teal-800 text-white text-center py-6 mt-16">
        <p>&copy; 2024 AI-Powered Tourism. All rights reserved.</p>
      </footer>
    </div>
  )
}
