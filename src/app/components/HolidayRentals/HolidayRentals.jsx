import Image from 'next/image';

const HolidayRentals = () => {
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

  const RentalCard = ({ rental, isUnique = false }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <Image src={rental.image} alt={rental.name} width={300} height={200} className="w-full h-48 object-cover" />
        <button className="absolute top-2 right-2 text-white bg-opacity-50 bg-gray-700 rounded-full p-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{rental.name}</h3>
        <p className="text-sm text-gray-600">{rental.location}</p>
        <div className="flex items-center mt-2">
          <span className="bg-teal-500 text-white px-1 rounded text-sm mr-2">{rental.rating}</span>
          <span className="text-sm text-gray-600">{isUnique ? 'Superb' : 'Fabulous'} · {rental.reviews} reviews</span>
        </div>
        {!isUnique && (
          <p className="mt-2 font-semibold">
            Starting from PKR {rental.price.toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Book a highly rated holiday rental</h2>
        <a href="#" className="text-teal-500 hover:underline">Discover holiday rentals</a>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {highlyRatedRentals.map((rental) => (
          <RentalCard key={rental.name} rental={rental} />
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4">Stay at our top unique properties</h2>
      <p className="text-gray-600 mb-4">From castles and villas to boats and igloos, we've got it all</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {uniqueProperties.map((property) => (
          <RentalCard key={property.name} rental={property} isUnique={true} />
        ))}
      </div>
    </div>
  );
};

export default HolidayRentals;