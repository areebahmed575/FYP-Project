import PropertyCard from "../../components/PropertyCard/PropertyCard";

const searchHotels = async (dest_id, search_type, arrival_date, departure_date) => {
  const url = `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels?dest_id=${dest_id}&search_type=${search_type}&arrival_date=${arrival_date}&departure_date=${departure_date}`; //&adults=1&children_age=0%2C17&room_qty=1&page_number=1&units=metric&temperature_unit=c&languagecode=en-us&currency_code=AED (optional)
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
  return data.data.hotels;
}

const searchDestination = async (slug) => {
  const url = `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination?query=${slug}`;
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
  // console.log("data ====>>>> ", data.data)
  const filteredData = data.data.filter((city) => (city.country === "Pakistan"))
  // console.log("Filtereddata ====>>>> ", filteredData)
  return filteredData[0];
}

const PropertyListingPage = async ({ params, searchParams }) => {
  // console.log(searchParams)
  const { slug } = params;
  const { arrival_date, departure_date } = searchParams;
  // console.log(arrival_date)
  // console.log(departure_date)
  // console.log(slug)

  const getDestination = await searchDestination(slug)
  // console.log("data ====>>>> ", getDestination)

  const { dest_id, search_type } = getDestination
  console.log(dest_id)

  const getHotels = await searchHotels(dest_id, search_type, arrival_date, departure_date)
  // console.log("hotels ====>>> ", getHotels)

  // const properties = [
  //   {
  //     image: "resort in",
  //     title: "Resort in Skardu",
  //     subtitle: "luxe • skardu • gilgit • snow",
  //     beds: 1,
  //     price: 57,
  //     discountedPrice: 46,
  //     total: 325
  //   },
  //   {
  //     image: "guest ",
  //     title: "Guesthouse in Skardu",
  //     subtitle: "family guest room near skardu",
  //     beds: 1,
  //     price: 12,
  //     discountedPrice: 10,
  //     total: 71
  //   },
  //   {
  //     image: "hotelin ",
  //     title: "Hotel in Skardu",
  //     subtitle: "Holiday Homes Skardu",
  //     beds: 9,
  //     price: 54,
  //     discountedPrice: 48,
  //     total: 338
  //   },{
  //     image: "resort in ",
  //     title: "Resort in Skardu",
  //     subtitle: "luxe • skardu • gilgit • snow",
  //     beds: 1,
  //     price: 57,
  //     discountedPrice: 46,
  //     total: 325
  //   },
  //   {
  //     image: "guest ",
  //     title: "Guesthouse in Skardu",
  //     subtitle: "family guest room near skardu",
  //     beds: 1,
  //     price: 12,
  //     discountedPrice: 10,
  //     total: 71
  //   },
  //   {
  //     image: "hotelin",
  //     title: "Hotel in Skardu",
  //     subtitle: "Holiday Homes Skardu",
  //     beds: 9,
  //     price: 54,
  //     discountedPrice: 48,
  //     total: 338
  //   }

  // ];

  return (
    <div className="container mx-auto p-4 pt-14">
      <h1 className="text-base font-medium mb-6">{getHotels.length} Hotels in {slug}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {getHotels.map((hotel) => (
              <PropertyCard key={hotel.hotel_id} data={hotel} />
            ))}
          </div>
        </div>
        <div className="hidden lg:block">
          <div className="sticky top-4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img src="https://maps.googleapis.com/maps/api/staticmap?center=Skardu,Pakistan&zoom=11&size=400x400&key=YOUR_API_KEY" alt="Map of Skardu" className="w-full h-96 object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyListingPage;