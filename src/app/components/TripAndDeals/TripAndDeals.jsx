'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useAppSelector } from '../../../lib/store/hooks';

const TripPlanner = () => {
  const {dates, options} = useAppSelector(state => state.search)
  // console.log(dates)
  // console.log(options)
  const vibes = ['Romance', 'City', 'Outdoors'];
  const topDestinations = [
    { name: 'Rawalpindi', distance: '1,123 km away', image: '/Mountains.jpg' },
    { name: 'Bhurban', distance: '1,174 km away', image: '/Hunza.webp' },
  ];
  const weekendDeals = [
    {
      name: 'Garlon Residence',
      location: 'Istanbul, Turkey',
      rating: 8.5,
      reviews: 1412,
      oldPrice: 52664,
      newPrice: 49371,
      nights: 2,
      image: '/Ratti-Gali-Arang-Kel.jpg',
    },
    
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-2">Quick and easy trip planner</h2>
      <p className="text-gray-600 mb-4">Pick a vibe and explore the top destinations in Pakistan</p>
      
      <div className="flex space-x-4 mb-6">
        {vibes.map((vibe) => (
          <button key={vibe} className="px-4 py-2 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition">
            {vibe === 'Romance'} {vibe}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        {topDestinations.map((dest) => (
          <Link href={`/PropertyListing/${dest.name}?arrival_date=${dates.startDate}&departure_date=${dates.endDate}`} key={dest.name} className="relative rounded-lg overflow-hidden">
            <Image src={dest.image} alt={dest.name} width={300} height={200} className="w-full h-48 object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <h3 className="text-white font-semibold">{dest.name}</h3>
              <p className="text-white text-sm">{dest.distance}</p>
            </div>
          </Link>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-2">Deals for the weekend</h2>
      <p className="text-gray-600 mb-4">Save on stays for 30 August - 1 September</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {weekendDeals.map((deal) => (
          <div key={deal.name} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image src={deal.image} alt={deal.name} width={300} height={200} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold">{deal.name}</h3>
              <p className="text-sm text-gray-600">{deal.location}</p>
              <div className="flex items-center mt-2">
                <span className="bg-teal-500 text-white px-1 rounded text-sm mr-2">{deal.rating}</span>
                <span className="text-sm text-gray-600">{deal.reviews} reviews</span>
              </div>
              <p className="mt-2">
                <span className="line-through text-gray-400">PKR {deal.oldPrice.toLocaleString()}</span>
                <span className="font-bold ml-2">PKR {deal.newPrice.toLocaleString()}</span>
              </p>
              <p className="text-sm text-gray-600">{deal.nights} nights</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TripPlanner;