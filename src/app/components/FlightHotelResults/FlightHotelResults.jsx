import React from 'react';

const FlightHotelResults = ({ markdown }) => {
    const formatMarkdownToHtml = (markdown) => {
        if (!markdown) return { flights: [], hotels: [] };

        // Split the markdown into flight and hotel sections
        const sections = markdown.split('###');
        const flightSection = sections.find(s => s.includes('Flight Options'))?.trim();
        const hotelSection = sections.find(s => s.includes('Hotel Options'))?.trim();

        return {
            flights: parseFlights(flightSection),
            hotels: parseHotels(hotelSection)
        };
    };

    const parseFlights = (flightSection) => {
        if (!flightSection) return [];

        // Split into individual flight entries
        const flights = flightSection.split(/\d+\.\s+/).filter(Boolean);

        return flights.map(flight => {
            const lines = flight.split('\n').filter(Boolean);

            return {
                flightNumber: lines.find(l => l.includes('Flight'))?.match(/PA \d+|9P \d+/)?.[0] || '',
                airline: lines.find(l => l.includes('Airline'))?.split(':')[1]?.trim() || '',
                departure: lines.find(l => l.includes('Departure'))?.replace('Departure:', '').trim() || '',
                arrival: lines.find(l => l.includes('Arrival'))?.replace('Arrival:', '').trim() || '',
                duration: lines.find(l => l.includes('Duration'))?.replace('Duration:', '').trim() || '',
                price: lines.find(l => l.includes('Price'))?.replace('Price:', '').trim() || '',
                logo: lines.find(l => l.includes('!['))?.match(/\((https:\/\/.*?)\)/)?.[1] || ''
            };
        });
    };

    const parseHotels = (hotelSection) => {
        if (!hotelSection) return [];

        // Split into individual hotel entries
        const hotels = hotelSection.split(/\d+\.\s+/).filter(Boolean);

        return hotels.map(hotel => {
            const lines = hotel.split('\n').filter(Boolean);

            return {
                name: lines[0]?.match(/\*\*(.*?)\*\*/)?.[1] || '',
                description: lines.find(l => l.includes('Description'))?.split(':')[1]?.trim() || '',
                price: lines.find(l => l.includes('Price'))?.split(':')[1]?.trim() || '',
                logo: lines.find(l => l.includes('!['))?.match(/\((https:\/\/.*?)\)/)?.[1] || '',
                website: lines.find(l => l.includes('[Book Here]'))?.match(/\((https:\/\/.*?)\)/)?.[1] || '#'
            };
        });
    };

    const { flights, hotels } = formatMarkdownToHtml(markdown);

    return (
        <div className="space-y-8 p-6">
            {/* Flight Section */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <h2 className="text-2xl font-bold text-indigo-600 p-6 border-b">Flight Options</h2>
                <div className="divide-y divide-gray-200">
                    {flights.map((flight, index) => (
                        <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                            <div className="flex items-start gap-6">
                                <div className="w-20 h-20 bg-white p-2 rounded-lg border flex items-center justify-center">
                                    {flight.logo ? (
                                        <img
                                            src={flight.logo}
                                            alt={flight.airline}
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 rounded-lg" />
                                    )}
                                </div>
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900">
                                                {flight.flightNumber}
                                            </h3>
                                            <p className="text-gray-600">{flight.airline}</p>
                                        </div>
                                        <p className="text-xl font-bold text-indigo-600">{flight.price}</p>
                                    </div>
                                    <div className="mt-4 grid grid-cols-2 gap-6">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Departure</p>
                                            <p className="mt-1 text-gray-900">{flight.departure}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Arrival</p>
                                            <p className="mt-1 text-gray-900">{flight.arrival}</p>
                                        </div>
                                    </div>
                                    <p className="mt-3 text-sm text-gray-600">Duration: {flight.duration}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Hotel Section */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <h2 className="text-2xl font-bold text-indigo-600 p-6 border-b">Hotel Options</h2>
                <div className="divide-y divide-gray-200">
                    {hotels.map((hotel, index) => (
                        <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                            <div className="flex items-start gap-6">
                                <div className="w-40 h-32 rounded-lg overflow-hidden">
                                    {hotel.logo ? (
                                        <img
                                            src={hotel.logo}
                                            alt={hotel.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100" />
                                    )}
                                </div>
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start">
                                        <div className="max-w-2xl">
                                            <h3 className="text-xl font-semibold text-gray-900">
                                                {hotel.name}
                                            </h3>
                                            <p className="mt-2 text-gray-600">{hotel.description}</p>
                                        </div>
                                        <p className="text-xl font-bold text-indigo-600 ml-4">{hotel.price}</p>
                                    </div>
                                    {hotel.website && (
                                        <a
                                            href={hotel.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-4 inline-block text-sm text-indigo-600 hover:text-indigo-800"
                                        >
                                            Visit Website →
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default FlightHotelResults;