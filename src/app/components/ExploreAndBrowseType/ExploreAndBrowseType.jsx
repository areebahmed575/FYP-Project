import Image from 'next/image';

const ExploreDestinations = () => {
  const destinations = [
    { name: 'Nathia Gali', properties: 3, image: '/attabadLake2.jpg' },
    { name: 'Murree', properties: 57, image: '/attabadLake2.jpg' },
    { name: 'Karachi', properties: 161, image: '/attabadLake2.jpg' },
    { name: 'Lahore', properties: 161, image: '/attabadLake2.jpg' },
    
  ];

  const propertyTypes = [
    { name: 'Hotels', image: '/hotels.jpeg' },
    { name: 'Apartments', image: '/apartments.jpeg' },
    { name: 'Resorts', image: '/resorts.jpeg' },
    { name: 'Villas', image: '/villas.jpeg' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Explore Pakistan</h2>
      <p className="text-gray-600 mb-6">These popular destinations have a lot to offer</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {destinations.map((dest) => (
          <div key={dest.name} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image src={dest.image} alt={dest.name} width={300} height={200} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold">{dest.name}</h3>
              <p className="text-sm text-gray-600">{dest.properties} properties</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-8 mt-14">Browse by property type</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {propertyTypes.map((type) => (
          <div key={type.name} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image src={type.image} alt={type.name} width={300} height={200} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold">{type.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreDestinations;