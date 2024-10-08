'use client'
import { useState, useEffect } from 'react';
import RentalCard from '../RentalCard/RentalCard'

const HolidayRentals = ({ dates }) => {
  const [highlyRatedHotel, setHighlyRatedHotel] = useState([]);
  const [error, setError] = useState(null);
  const { startDate, endDate } = dates[0]

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
      console.log(data.data.hotels.slice(0, 4))
      setHighlyRatedHotel(data.data.hotels.slice(0, 4))
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    highlyRatedHotels("-2762645", startDate, endDate)
  }, [startDate, endDate])

  const highlyRatedRentals = [
    {
      name: 'Masherbrum House',
      location: 'Hunza',
      rating: 9.0,
      reviews: 3016,
      price: 49373,
      image: '/hotel1.webp',
    },
    {
      name: 'Masherbrum House',
      location: 'Hunza',
      rating: 9.1,
      reviews: 3016,
      price: 49373,
      image: '/hotel1.webp',
    },
    {
      name: 'Masherbrum House',
      location: 'Hunza',
      rating: 9.0,
      reviews: 3016,
      price: 39373,
      image: '/hotel1.webp',
    },
    {
      name: 'Masherbrum House',
      location: 'Hunza',
      rating: 9.8,
      reviews: 3016,
      price: 59373,
      image: '/hotel1.webp',
    },

  ];

  const uniqueProperties = [
    {
      name: 'Luxus Hunza Attabad Lake Resort',
      location: 'Sweden, Ljungskile',
      rating: 9.3,
      reviews: 133,
      image: '/apartments2.jpeg',
    },
    {
      name: 'Luxus Hunza Attabad Lake Resort',
      location: 'Hunza',
      rating: 9.2,
      reviews: 133,
      image: '/apartments2.jpeg',
    },
    {
      name: 'Luxus Hunza Attabad Lake Resort',
      location: 'Hunza',
      rating: 9.2,
      reviews: 133,
      image: '/apartments2.jpeg',
    },
    {
      name: 'Luxus Hunza Attabad Lake Resort',
      location: 'Hunza',
      rating: 9.3,
      reviews: 133,
      image: '/apartments2.jpeg',
    },
  ];


  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Book a highly rated holiday rental</h2>
        <a href="#" className="text-teal-500 hover:underline">Discover holiday rentals</a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {/* {console.log(highlyRatedHotel)} */}
        {highlyRatedHotel.map((hotel) => (
          <RentalCard key={hotel.hotel_id} rental={hotel} />
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4">Stay at our top unique properties</h2>
      <p className="text-gray-600 mb-4">From castles and villas to boats and igloos, we've got it all</p>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {uniqueProperties.map((property) => (
          <RentalCard key={property.name} rental={property} isUnique={true} />
        ))}
      </div> */}
    </div>
  );
};

export default HolidayRentals;