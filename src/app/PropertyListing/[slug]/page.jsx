import PropertyCard from "../../components/PropertyCard/PropertyCard";

const searchHotels = async (dest_id, search_type, arrival_date, departure_date, categories_filter) => {
  const url = `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels?dest_id=${dest_id}&search_type=${search_type}&arrival_date=${arrival_date}&departure_date=${departure_date}${categories_filter ? `&categories_filter=${categories_filter}`: ''}`; //&adults=1&children_age=0%2C17&room_qty=1&page_number=1&units=metric&temperature_unit=c&languagecode=en-us&currency_code=AED (optional)
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

  // --------------------------------RAPIDAPI WORK--------------------------------
  // const { arrival_date, departure_date, categories_filter } = searchParams;

  // const getDestination = await searchDestination(slug)
  // // console.log("data ====>>>> ", getDestination)
  // const getHotels = await searchHotels(dest_id, search_type, arrival_date, departure_date)

  //-------------------------------------LOCAL WORK-------------------------------------

  const properties = [
    {
      image: "resort in",
      title: "Resort in Skardu",
      subtitle: "luxe • skardu • gilgit • snow",
      beds: 1,
      price: 57,
      discountedPrice: 46,
      total: 325
    },
    {
      image: "guest ",
      title: "Guesthouse in Skardu",
      subtitle: "family guest room near skardu",
      beds: 1,
      price: 12,
      discountedPrice: 10,
      total: 71
    },
    {
      image: "hotelin ",
      title: "Hotel in Skardu",
      subtitle: "Holiday Homes Skardu",
      beds: 9,
      price: 54,
      discountedPrice: 48,
      total: 338
    },{
      image: "resort in ",
      title: "Resort in Skardu",
      subtitle: "luxe • skardu • gilgit • snow",
      beds: 1,
      price: 57,
      discountedPrice: 46,
      total: 325
    },
    {
      image: "guest ",
      title: "Guesthouse in Skardu",
      subtitle: "family guest room near skardu",
      beds: 1,
      price: 12,
      discountedPrice: 10,
      total: 71
    },
    {
      image: "hotelin",
      title: "Hotel in Skardu",
      subtitle: "Holiday Homes Skardu",
      beds: 9,
      price: 54,
      discountedPrice: 48,
      total: 338
    }

  ];

  return (
    <div className="container mx-auto p-4 pt-14">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">{"getHotels.length"} Hotels in {"slug"}</h1>

      {/* -------------------RAPIDAPI WORK----------------------------- */}
      {/* <h1 className="text-3xl font-bold mb-8 text-gray-800">{getHotels.length} Hotels in {slug}</h1> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* ----------------------LOCAL WORK--------------------- */}
        {properties.map((hotel) => (
          <PropertyCard key={hotel.title} data={hotel} />
        ))}

        {/* ------------------------RAPIDAPI WORK -------------------------- */}

        {/* {getHotels.map((hotel) => (
          <PropertyCard key={hotel.hotel_id} data={hotel} />
        ))} */}
      </div>
    </div>
  );
};

export default PropertyListingPage;
