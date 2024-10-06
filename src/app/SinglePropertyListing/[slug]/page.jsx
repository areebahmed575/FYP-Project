'use client'
import Image from 'next/image'
import { useState } from 'react'
import { FaShare, FaHeart, FaStar, FaMedal, FaKey, FaSwimmingPool } from 'react-icons/fa'
import { useAppSelector } from '../../../lib/store/hooks'

export default function Home() {
  const { dates } = useAppSelector(state => state.search)
  console.log(dates)
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')
  const [guests, setGuests] = useState(2)
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false)
  const [isReviewsOpen, setIsReviewsOpen] = useState(false)

  const handleGuestChange = (newGuests) => {
    setGuests(newGuests)
    setIsGuestDropdownOpen(false)
  }

  return (
    <div className="container mx-auto px-4 mt-16 relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Luxe Hut • Skardu • Gilgit • Snow Desert • Pakistan</h1>
        <div className="flex space-x-2">
          <button className="bg-white px-4 py-2 rounded-full shadow text-sm font-semibold flex items-center">
            <FaShare className="mr-2" /> Share
          </button>
          <button className="bg-white px-4 py-2 rounded-full shadow text-sm font-semibold flex items-center">
            <FaHeart className="mr-2" /> Save
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 grid-rows-2 gap-2 mb-4 h-[500px]">
        <Image src="/sk1.webp" alt="Resort exterior" width={800} height={600} className="col-span-2 row-span-2 w-full h-full object-cover rounded-l-lg" />
        <Image src="/sk2.webp" alt="Interior" width={400} height={300} className="w-full h-full object-cover rounded-tr-lg" />
        <Image src="/sk3.webp" alt="View" width={400} height={300} className="w-full h-full object-cover" />
        <Image src="/sk4.webp" alt="Guests" width={400} height={300} className="w-full h-full object-cover" />
        <Image src="/sk5.webp" alt="Additional view" width={400} height={300} className="w-full h-full object-cover rounded-br-lg" />
      </div>


      <div className="mt-8 flex justify-between">
        <div className="w-2/3 pr-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-semibold">Hut in Skardu, Pakistan</h2>
              <p className="text-gray-600">2 guests · 1 bedroom · 1 bed · 1 bath</p>
            </div>
            <div className="flex items-center">
              <FaStar className="text-yellow-400 mr-1" />
              <span className="font-semibold">4.9</span>
              <span className="mx-1">·</span>
              <span className="text-gray-600 underline">24 reviews</span>
              <FaMedal className="text-yellow-600 ml-2" />
              <span className="text-sm font-semibold ml-1">Superhost</span>
            </div>
          </div>

          <div className="border-t border-b border-gray-200 py-4 my-4">
            <div className="flex items-center">
              <Image src="/oasis.webp" alt="Host" width={56} height={56} className="rounded-full mr-4" />
              <div>
                <h3 className="font-semibold text-lg">Hosted by Oasis Resort</h3>
                <p className="text-gray-600">1 month hosting</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-start">
              <FaKey className="text-2xl mr-4 text-gray-600" />
              <div>
                <h4 className="font-semibold">Self check-in</h4>
                <p className="text-gray-600">Check yourself in with the keypad.</p>
              </div>
            </div>
            <div className="flex items-start">
              <FaSwimmingPool className="text-2xl mr-4 text-gray-600" />
              <div>
                <h4 className="font-semibold">Dive right in</h4>
                <p className="text-gray-600">This is one of the few places in the area with a pool.</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">About this space</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Experience the magic of Skardu in our luxurious hut nestled in the heart of the snow desert.
              This unique retreat offers breathtaking views of the surrounding mountains and a perfect blend of
              modern comfort and traditional charm. You'll love sharing photos of this one-of-a-kind place with your friends.
            </p>

          </div>




        </div>

        <div className="w-1/3">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 sticky top-4">
            <h2 className="text-2xl font-bold mb-4">PKR 25,000 <span className="text-base font-normal text-gray-500">night</span></h2>
            <div className="flex mb-4">
              <div className="w-1/2 pr-1">
                <h3 className="font-semibold text-gray-700 text-xs uppercase">CHECK-IN</h3>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full border rounded-tl-lg rounded-bl-lg p-2 mt-1 text-sm"
                />
              </div>
              <div className="w-1/2 pl-1">
                <h3 className="font-semibold text-gray-700 text-xs uppercase">CHECKOUT</h3>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="w-full border rounded-tr-lg rounded-br-lg p-2 mt-1 text-sm"
                />
              </div>
            </div>
            <div className="mb-4 relative">
              <h3 className="font-semibold text-gray-700 text-xs uppercase mb-1">GUESTS</h3>
              <button
                onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
                className="w-full text-left border rounded-lg p-2 flex justify-between items-center text-sm"
              >
                <span>{guests} {guests === 1 ? 'guest' : 'guests'}</span>
                {/* <span className="text-gray-400">▼</span> */}
              </button>
              {isGuestDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleGuestChange(num)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      {num} {num === 1 ? 'guest' : 'guests'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-teal-700 transition-all duration-200 shadow-md">
              Check availability
            </button>

            <div className="mt-4 text-sm text-gray-500 text-center">You won't be charged yet</div>

            <div className="mt-4 p-4 bg-teal-50 rounded-lg">
              <div className="flex items-center">
                <span className="text-teal-500 text-2xl mr-3">⏰</span>
                <div>
                  <h3 className="font-semibold text-teal-700">Special offer: save PKR 5000</h3>
                  <p className="text-teal-600 text-sm">This Host is offering a deal on their first 3 bookings.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}