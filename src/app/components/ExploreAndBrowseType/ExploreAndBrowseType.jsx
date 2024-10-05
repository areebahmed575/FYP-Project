"use client"
import Image from 'next/image';
import Link from 'next/link';

const ExploreDestinations = ({dates, options}) => {
  // console.log(dates)
  const arrival = dates[0].startDate.substring(0,10)
  const departure = dates[0].endDate.substring(0,10)
  // console.log(departure)

  const destinations = [
    { name: 'Nathia Gali', properties: 3, image: '/attabadLake2.jpg' },
    { name: 'Murree', properties: 57, image: '/attabadLake2.jpg' },
    { name: 'Skardu', properties: 161, image: '/attabadLake2.jpg' },
    { name: 'Hunza', properties: 161, image: '/attabadLake2.jpg' },

  ];

  const propertyTypes = [
    { name: 'Hotels', image: '/hotels.jpeg' },
    { name: 'Apartments', image: '/apartments.jpeg' },
    { name: 'Resorts', image: '/resorts.jpeg' },
    { name: 'Villas', image: '/villas.jpeg' },
  ];
  //?arrival_date=${arrival}&departure_date=${departure}
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Explore Pakistan</h2>
      <p className="text-gray-600 mb-6">These popular destinations have a lot to offer</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {destinations.map((dest) => (
          <Link key={dest.name} href={`/PropertyListing/${dest.name}?arrival_date=${arrival}&departure_date=${departure}`}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image src={dest.image} alt={dest.name} width={300} height={200} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold">{dest.name}</h3>
                {/* <p className="text-sm text-gray-600">{dest.properties} properties</p> */}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* <h2 className="text-2xl font-bold mb-8 mt-14">Browse by property type</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {propertyTypes.map((type) => (
          <div key={type.name} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image src={type.image} alt={type.name} width={300} height={200} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold">{type.name}</h3>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default ExploreDestinations;