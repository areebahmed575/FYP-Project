import Image from 'next/image'
import { FaShare, FaHeart, FaStar, FaMedal, FaKey, FaSwimmingPool } from 'react-icons/fa'
import DatesAndGuest from '../../components/DatesAndGuest/DatesAndGuest'

const searchHotel = async (hotel_id, arrival_date, departure_date) => {
  const url = `https://booking-com15.p.rapidapi.com/api/v1/hotels/getHotelDetails?hotel_id=${hotel_id}&arrival_date=${arrival_date}&departure_date=${departure_date}`; //&adults=1&children_age=0%2C17&room_qty=1&page_number=1&units=metric&temperature_unit=c&languagecode=en-us&currency_code=AED (optional)
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
  // console.log(data.data)
  return data.data;
}

const searchHotelPhotos = async (hotel_id) => {
  const url = `https://booking-com15.p.rapidapi.com/api/v1/hotels/getHotelPhotos?hotel_id=${hotel_id}`; //&adults=1&children_age=0%2C17&room_qty=1&page_number=1&units=metric&temperature_unit=c&languagecode=en-us&currency_code=AED (optional)
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
  // console.log(data.data) 
  return data.data;
}

const searchHotelDescription = async (hotel_id) => {
  const url = `https://booking-com15.p.rapidapi.com/api/v1/hotels/getDescriptionAndInfo?hotel_id=${hotel_id}`; //&adults=1&children_age=0%2C17&room_qty=1&page_number=1&units=metric&temperature_unit=c&languagecode=en-us&currency_code=AED (optional)
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
  // console.log(data.data) 
  return data.data[0];
}

const searchHotelRating = async (hotel_id) => {
  const url = `https://booking-com15.p.rapidapi.com/api/v1/hotels/getHotelReviewScores?hotel_id=${hotel_id}`; //&adults=1&children_age=0%2C17&room_qty=1&page_number=1&units=metric&temperature_unit=c&languagecode=en-us&currency_code=AED (optional)
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
  // console.log(data.data) 
  return data.data;
}

const SingleProperty = async ({ params, searchParams }) => {

  //------------------RAPID API----------------------------
  // const { slug } = params
  const { arrival_date, departure_date } = searchParams;
  // const getHotel = await searchHotel(slug, arrival_date, departure_date)
  // const getHotelPhotos = await searchHotelPhotos(slug)
  // const getHotelDescription = await searchHotelDescription(slug)
  // const { description } = getHotelDescription
  // const getHotelRating = await searchHotelRating(slug)
  // const { hotel_name, accommodation_type_name, address, city, country_trans, available_rooms, room_recommendation, review_nr, property_highlight_strip, product_price_breakdown } = getHotel
  // const { gross_amount_per_night, all_inclusive_amount_hotel_currency, all_inclusive_amount, gross_amount_hotel_currency } = product_price_breakdown

  // const currencyChangeHandler = () => {
  //   if (all_inclusive_amount_hotel_currency.currency === 'USD') {
  //     const usdCurrency = 278.64;
  //     const priceInPKR = Math.round(usdCurrency * all_inclusive_amount.value.toFixed(2)).toLocaleString('en-US')
  //     // console.log(priceInPKR)
  //     return priceInPKR
  //   } else {
  //     // console.log(all_inclusive_amount_hotel_currency.value.toLocaleString('en-US'))
  //     return all_inclusive_amount_hotel_currency.value.toLocaleString('en-US')
  //   }
  // }
  // const currencyChange = currencyChangeHandler()

  // const usdCurrency = 278.64;
  // const priceInPKR = Math.round(usdCurrency * gross_amount_per_night.value.toFixed(2)).toLocaleString('en-US')

  return (

    // -------------------LOCAL WORK----------------------------
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
        <Image src={"/sk1.webp"} alt="Resort exterior" width={800} height={600} className="col-span-2 row-span-2 w-full h-full object-cover rounded-l-lg" />
        <Image src={"/sk2.webp"} alt="Interior" width={400} height={300} className="w-full h-full object-cover rounded-tr-lg" />
        <Image src={"/sk3.webp"} alt="View" width={400} height={300} className="w-full h-full object-cover" />
        <Image src={"/sk4.webp"} alt="Guests" width={400} height={300} className="w-full h-full object-cover" />
        <Image src={"/sk5.webp"} alt="Additional view" width={400} height={300} className="w-full h-full object-cover rounded-br-lg" />
      </div>


      <div className="mt-8 flex justify-between">
        <div className="w-2/3 pr-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-semibold">Hut in Skardu, Pakistan</h2>
              <p className="text-gray-600">Hut in Skardu, Pakistan</p>
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
              This is one of the few places in the area with a pool
            </p>

          </div>

        </div>

        <div className="w-1/3">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 sticky top-4">
            <div className='mb-4'>
              <h2 className="text-2xl font-bold ">PKR {'90,000'} <span className="text-base font-normal text-gray-500"> night </span></h2>
              <p className="text-base font-normal text-gray-500">*Inclusive Tax</p>
            </div>

            <DatesAndGuest arrival_date={arrival_date} departure_date={departure_date} />

            <div>
              <div className='mb-4'>
                <h2 className="text-2xl font-bold ">PKR {'90,000'} <span className="text-base font-normal text-gray-500"> Total </span></h2>
              </div>
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

    // -------------------RAPID API----------------------------
    // <div className="container mx-auto px-4 mt-16 relative">
    //   <div className="flex justify-between items-center mb-4">
    //     <h1 className="text-3xl font-bold">{accommodation_type_name} • {city} • {country_trans}</h1>
    //     <div className="flex space-x-2">
    //       <button className="bg-white px-4 py-2 rounded-full shadow text-sm font-semibold flex items-center">
    //         <FaShare className="mr-2" /> Share
    //       </button>
    //       <button className="bg-white px-4 py-2 rounded-full shadow text-sm font-semibold flex items-center">
    //         <FaHeart className="mr-2" /> Save
    //       </button>
    //     </div>
    //   </div>

    //   <div className="grid grid-cols-4 grid-rows-2 gap-2 mb-4 h-[500px]">
    //     <Image src={getHotelPhotos[0].url} alt="Resort exterior" width={800} height={600} className="col-span-2 row-span-2 w-full h-full object-cover rounded-l-lg" />
    //     <Image src={getHotelPhotos[1].url} alt="Interior" width={400} height={300} className="w-full h-full object-cover rounded-tr-lg" />
    //     <Image src={getHotelPhotos[2].url} alt="View" width={400} height={300} className="w-full h-full object-cover" />
    //     <Image src={getHotelPhotos[3].url} alt="Guests" width={400} height={300} className="w-full h-full object-cover" />
    //     <Image src={getHotelPhotos[4].url} alt="Additional view" width={400} height={300} className="w-full h-full object-cover rounded-br-lg" />
    //   </div>


    //   <div className="mt-8 flex justify-between">
    //     <div className="w-2/3 pr-8">
    //       <div className="flex justify-between items-center mb-4">
    //         <div>
    //           <h2 className="text-2xl font-semibold">{hotel_name}</h2>
    //           <p className="text-gray-600">{address}</p>
    //         </div>
    //         <div className="flex items-center">
    //           <FaStar className="text-yellow-400 mr-1" />
    //           <span className="font-semibold">{getHotelRating[0].score_breakdown[0].average_score}</span>
    //           <span className="mx-1">·</span>
    //           <span className="text-gray-600 underline">{review_nr} reviews</span>
    //           <FaMedal className="text-yellow-600 ml-2" />
    //           <span className="text-sm font-semibold ml-1">Superhost</span>
    //         </div>
    //       </div>

    //       <div className="border-t border-b border-gray-200 py-4 my-4">
    //       </div>

    //       <div className="grid grid-cols-2 gap-4 mb-6">
    //         <div className="flex items-start">
    //           <FaKey className="text-2xl mr-4 text-gray-600" />
    //           <div>
    //             <h4 className="font-semibold">Self check-in</h4>
    //             <p className="text-gray-600">Check yourself in with the keypad.</p>
    //           </div>
    //         </div>
    //         <div className="flex items-start">
    //           <FaSwimmingPool className="text-2xl mr-4 text-gray-600" />
    //           <div>
    //             <h4 className="font-semibold">Dive right in</h4>
    //             <p className="text-gray-600">This is one of the few places in the area with a pool.</p>
    //           </div>
    //         </div>
    //       </div>

    //       <div className="mt-6">
    //         <h3 className="text-xl font-semibold mb-2">About this space</h3>
    //         <p className="text-gray-700 leading-relaxed mb-4">
    //           {description}
    //         </p>

    //       </div>

    //     </div>

    //     <div className="w-1/3">
    //       <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 sticky top-4">
    //         <div className='mb-4'>
    //           <h2 className="text-2xl font-bold ">PKR {priceInPKR} <span className="text-base font-normal text-gray-500"> night </span></h2>
    //           <p className="text-base font-normal text-gray-500">*Inclusive Tax</p>
    //         </div>

    //         <DatesAndGuest arrival_date={arrival_date} departure_date={departure_date} />

    //         <div>
    //           <div className='mb-4'>
    //             <h2 className="text-2xl font-bold ">PKR {currencyChange} <span className="text-base font-normal text-gray-500"> Total </span></h2>
    //           </div>
    //         </div>

    //         <button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-teal-700 transition-all duration-200 shadow-md">
    //           Check availability
    //         </button>

    //         <div className="mt-4 text-sm text-gray-500 text-center">You won't be charged yet</div>

    //         <div className="mt-4 p-4 bg-teal-50 rounded-lg">
    //           <div className="flex items-center">
    //             <span className="text-teal-500 text-2xl mr-3">⏰</span>
    //             <div>
    //               <h3 className="font-semibold text-teal-700">Special offer: save PKR 5000</h3>
    //               <p className="text-teal-600 text-sm">This Host is offering a deal on their first 3 bookings.</p>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    // </div>
  )
}

export default SingleProperty;